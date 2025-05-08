package services

import (
	"cdserver/config"
	"cdserver/models"
	"context"
	"fmt"
	"log"
	"mime/multipart"
	"net/url"
	"strings"
	"time"

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

func (s *FileService) IsBucketExisted(c *gin.Context) (bool, error) {
	bucketName := getBucketName(c)
	ctx := context.Background()
	exists, err := s.client.BucketExists(ctx, bucketName)

	if err != nil {
		return false, err
	}

	return exists, nil
}

func (s *FileService) IsBinBucketExisted(c *gin.Context) (bool, error) {
	bucketName := getBinBucketName(c)
	ctx := context.Background()
	exists, err := s.client.BucketExists(ctx, bucketName)

	if err != nil {
		return false, err
	}

	return exists, nil
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

func (s *FileService) CreateBinBucket(c *gin.Context) error {
	ctx := context.Background()
	binBucketName := getBinBucketName(c)

	err := s.client.MakeBucket(ctx, binBucketName, minio.MakeBucketOptions{
		Region: "macao",
	})

	if err != nil {
		return err
	}

	fmt.Println("New bucket created")

	return nil
}

// 上传文件
func (s *FileService) UploadFile(c *gin.Context, file *multipart.FileHeader, path string, filename string) error {
	ctx := context.Background()

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

// 上传空文件
func (s *FileService) UploadEmptyFile(c *gin.Context, folderPath string) error {
	ctx := context.Background()

	// 获取 bucket 名称
	bucketName := getBucketName(c)

	_, err := s.client.PutObject(ctx, bucketName, folderPath, nil, 0, minio.PutObjectOptions{})
	if err != nil {
		return err
	}

	log.Printf("成功创建文件夹: %s\n", folderPath)

	return nil
}

// 列出文件
func (s *FileService) ListFiles(c *gin.Context, path string, listAll bool) ([]minio.ObjectInfo, error) {
	ctx := context.Background()
	bucketName := getBucketName(c)

	// 列出文件
	log.Println("Listing files in bucket:", bucketName)
	objectsCh := s.client.ListObjects(ctx, bucketName, minio.ListObjectsOptions{
		Recursive:    false,
		Prefix:       path,
		WithMetadata: true,
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

// 列出回收站文件
func (s *FileService) ListBinFiles(c *gin.Context, path string) ([]minio.ObjectInfo, error) {
	ctx := context.Background()
	binBucketName := getBinBucketName(c)

	// 列出文件
	log.Println("Listing files in bucket:", binBucketName)
	objectsCh := s.client.ListObjects(ctx, binBucketName, minio.ListObjectsOptions{
		Recursive: false,
		Prefix:    path,
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

// 删除文件
func (s *FileService) DeleteFile(c *gin.Context, filename string) error {
	ctx := context.Background()
	bucketName := getBucketName(c)

	// 获取文件名和路径
	if filename == "" {
		return fmt.Errorf("filename is required")
	}

	// 删除文件
	log.Println("Deleting file from MinIO:", filename)
	err := s.client.RemoveObject(ctx, bucketName, filename, minio.RemoveObjectOptions{})
	if err != nil {
		return fmt.Errorf("failed to delete file from MinIO: %w", err)
	}

	log.Printf("File deleted successfully from bucket '%s' at path '%s'", bucketName, filename)
	return nil
}

// 删除回收站文件
func (s *FileService) DeleteFileFromBin(c *gin.Context, filename string) error {
	ctx := context.Background()
	binBucketName := getBinBucketName(c)

	// 获取文件名和路径
	if filename == "" {
		return fmt.Errorf("filename is required")
	}

	// 删除文件
	log.Println("Deleting file from MinIO:", filename)
	err := s.client.RemoveObject(ctx, binBucketName, filename, minio.RemoveObjectOptions{})
	if err != nil {
		return fmt.Errorf("failed to delete file from MinIO: %w", err)
	}

	log.Printf("File deleted successfully from bucket '%s' at path '%s'", binBucketName, filename)
	return nil
}

func (s *FileService) ModifyFilename(c *gin.Context, srcFilename string, dstFilename string) error {
	ctx := context.Background()
	bucketName := getBucketName(c)

	_, err := s.client.CopyObject(ctx, minio.CopyDestOptions{
		Bucket: bucketName,
		Object: dstFilename,
	}, minio.CopySrcOptions{
		Bucket: bucketName,
		Object: srcFilename,
	})

	if err != nil {
		log.Print(err.Error())
		return fmt.Errorf("failed to copy file from src to dst")
	}

	log.Printf("Filename modified successfully ")

	return nil
}

func (s *FileService) GetFileURL(c *gin.Context, filename string) (url.URL, error) {
	ctx := context.Background()
	bucketName := getBucketName(c)

	u, err := s.client.PresignedGetObject(ctx, bucketName, filename, time.Second*60*60*24, url.Values{})

	if err != nil {
		return url.URL{}, err
	}

	return *u, nil
}

func (s *FileService) MoveObjectToBin(c *gin.Context, srcFilename string, dstFilename string) error {
	ctx := context.Background()
	bucketName := getBucketName(c)
	binBucketName := getBinBucketName(c)

	_, err := s.client.CopyObject(ctx, minio.CopyDestOptions{
		Bucket: binBucketName,
		Object: dstFilename,
	}, minio.CopySrcOptions{
		Bucket: bucketName,
		Object: srcFilename,
	})

	if err != nil {
		return err
	}

	username, exists := c.Get("username")
	if !exists {
		log.Println("username not found in gin context")
	}

	relation := models.Filemap{
		Username: username.(string),
		Srcname:  srcFilename,
		Dstname:  dstFilename,
	}

	err = s.db.Create(&relation).Error
	if err != nil {
		return err
	}
	log.Println("Object tagging succeeded!")
	return nil
}

func (s *FileService) MoveObjectOutOfBin(c *gin.Context, dstFilename string) error {
	ctx := context.Background()
	bucketName := getBucketName(c)
	binBucketName := getBinBucketName(c)

	var fileMap models.Filemap

	username, exists := c.Get("username")
	if !exists {
		log.Println("username not found in gin context")
	}

	s.db.Where(&models.Filemap{Username: username.(string), Dstname: dstFilename}).First(&fileMap)

	_, err := s.client.CopyObject(ctx, minio.CopyDestOptions{
		Bucket: bucketName,
		Object: fileMap.Srcname,
	}, minio.CopySrcOptions{
		Bucket: binBucketName,
		Object: dstFilename,
	})

	if err != nil {
		return err
	}

	relation := models.Filemap{
		Username: username.(string),
		Srcname:  fileMap.Srcname,
		Dstname:  dstFilename,
	}

	err = s.db.Where("username = ?", username).Where("dstname", dstFilename).Delete(&relation).Error
	if err != nil {
		return err
	}

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

// getBucketName generates a bucket name based on the username from the context.
func getBinBucketName(c *gin.Context) string {
	username, exists := c.Get("username")
	if !exists {
		log.Println("username not found in gin context")
	}
	bucketName := "b-bin" + username.(string)
	bucketName = strings.ReplaceAll(bucketName, " ", "-")
	bucketName = strings.ToLower(bucketName)
	if len(bucketName) > 63 { // MinIO bucket name max length is 63 characters
		bucketName = bucketName[:63] // Truncate to 63 characters
	}
	return bucketName
}
