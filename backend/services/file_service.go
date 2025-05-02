package services

import (
	"cdserver/config"
	"context"
	"fmt"
	"log"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/minio/minio-go/v7"
	"gorm.io/gorm"
)

type FileService struct {
	db     *gorm.DB
	client *minio.Client
}

func NewFileService() *FileService {
	return &FileService{
		db:     config.GetDB(),
		client: config.GetMinIOClient(),
	}
}

func (s *FileService) IsBucketExisted(c *gin.Context) (error, bool) {
	bucketName := getBucketName(c)
	ctx := context.Background()
	exists, err := s.client.BucketExists(ctx, bucketName)

	if err != nil {
		return err, false
	}

	return nil, exists
}

func (s *FileService) CreateBucket(c *gin.Context) error {
	ctx := context.Background()
	bucketName := getBucketName(c)

	err := s.client.MakeBucket(ctx, bucketName, minio.MakeBucketOptions{
		Region: "macao",
	})

	if err != nil {
		return err
	}

	fmt.Println("New bucket created")

	return nil
}

func (s *FileService) UploadFile(c *gin.Context) error {
	ctx := context.Background()

	// 从 form-data 中获取文件
	file, err := c.FormFile("image")
	if err != nil {
		return fmt.Errorf("failed to get file from form-data: %w", err)
	}

	// 获取文件名和路径
	filename := c.PostForm("text")
	if filename == "" {
		return fmt.Errorf("filename is required")
	}
	path := c.PostForm("path")
	if path == "" {
		return fmt.Errorf("path is required")
	}

	// 获取 bucket 名称
	bucketName := getBucketName(c)

	// 打开文件
	srcFile, err := file.Open()
	if err != nil {
		return fmt.Errorf("failed to open uploaded file: %w", err)
	}
	defer srcFile.Close()

	// 上传文件到 MinIO
	uploadPath := path + filename
	log.Println("Uploading file to MinIO:", uploadPath)
	log.Println("bucketName:", bucketName)
	_, err = s.client.PutObject(ctx, bucketName, uploadPath, srcFile, file.Size, minio.PutObjectOptions{
		ContentType: file.Header.Get("Content-Type"),
	})
	if err != nil {
		return fmt.Errorf("failed to upload file to MinIO: %w", err)
	}

	log.Printf("File uploaded successfully to bucket '%s' at path '%s'", bucketName, uploadPath)
	return nil
}

func (s *FileService) ListFiles(c *gin.Context) ([]minio.ObjectInfo, error) {
	ctx := context.Background()
	bucketName := getBucketName(c)

	// 列出文件
	log.Println("Listing files in bucket:", bucketName)
	objectsCh := s.client.ListObjects(ctx, bucketName, minio.ListObjectsOptions{
		Recursive: true,
		Prefix:    c.Query("path"),
	})

	var files []minio.ObjectInfo
	for object := range objectsCh {
		if object.Err != nil {
			return nil, fmt.Errorf("failed to list objects: %w", object.Err)
		}
		files = append(files, object)
	}

	return files, nil
}

func (s *FileService) DeleteFile(c *gin.Context) error {
	ctx := context.Background()
	bucketName := getBucketName(c)

	// 获取文件名和路径
	filename := c.PostForm("text")
	if filename == "" {
		return fmt.Errorf("filename is required")
	}
	path := c.PostForm("path")
	if path == "" {
		return fmt.Errorf("path is required")
	}

	// 删除文件
	log.Println("Deleting file from MinIO:", path+filename)
	err := s.client.RemoveObject(ctx, bucketName, path+filename, minio.RemoveObjectOptions{})
	if err != nil {
		return fmt.Errorf("failed to delete file from MinIO: %w", err)
	}

	log.Printf("File deleted successfully from bucket '%s' at path '%s'", bucketName, path+filename)
	return nil
}

func (s *FileService) ModifyFilename(c *gin.Context, srcFilename string, dstFilename string) error {
	ctx := context.Background()
	bucketName := getBucketName(c)

	_, err := s.client.CopyObject(ctx, minio.CopyDestOptions{
		Bucket: bucketName,
		Object: srcFilename,
	}, minio.CopySrcOptions{
		Bucket: bucketName,
		Object: dstFilename,
	})

	if err != nil {
		return fmt.Errorf("failed to copy file from src to dst")
	}

	log.Printf("Filename modified successfully ")

	return nil
}

// getBucketName generates a bucket name based on the username from the context.
func getBucketName(c *gin.Context) string {
	username, exists := c.Get("username")
	if !exists {
		log.Println("username not found in gin context")
	}
	bucketName := "b" + username.(string)
	bucketName = strings.ReplaceAll(bucketName, " ", "-")
	bucketName = strings.ToLower(bucketName)
	if len(bucketName) > 63 { // MinIO bucket name max length is 63 characters
		bucketName = bucketName[:63] // Truncate to 63 characters
	}
	return bucketName
}
