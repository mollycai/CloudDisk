package controllers

import (
	"cdserver/services"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/minio/minio-go/v7"
)

type FileController struct {
	fileService *services.FileService
}

type FileListingRequest struct {
	Path string `json:"path"`
}

type FileModifyInfo struct {
	Srcname string `json:"srcname" binding:"required"`
	Dstname string `json:"dstname" binding:"required"`
}

type UploadRequest struct {
}

type FilesDeleteRequest struct {
	Filenames []string `json:"filenames" binding:"required"`
}

type FilenamesModifyRequest struct {
	FileInfos []FileModifyInfo `json:"fileinfos" binding:"required"`
}

func NewFileController() *FileController {
	return &FileController{
		fileService: services.NewFileService(),
	}
}

// 上传文件
func (controller *FileController) Upload(c *gin.Context) {
	err := controller.checkUserBucket(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error", "code": http.StatusInternalServerError, "data": nil})
		return
	}

	// 从 form-data 中获取文件
	file, err := c.FormFile("image")
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"code": http.StatusBadRequest, "data": nil, "msg": err.Error()})
		return
	}

	// 获取文件名和路径
	filename := c.PostForm("filename")
	if filename == "" {
		log.Println("filename filed is empty")
		c.JSON(http.StatusBadRequest, gin.H{"code": http.StatusBadRequest, "data": nil, "msg": "filename can't be empty"})
		return
	}
	path := c.PostForm("path")
	if path == "" {
		log.Println("path filed is empty")
		c.JSON(http.StatusBadRequest, gin.H{"code": http.StatusBadRequest, "data": nil, "msg": "path can't be empty"})
		return
	}

	err = controller.fileService.UploadFile(c, file, path, filename)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "code": http.StatusInternalServerError, "data": nil})
		return
	}
	// Upload successful
	c.JSON(http.StatusOK, gin.H{"msg": "File uploaded successfully.", "code": http.StatusOK, "data": nil})
}

// 列出文件
func (controller *FileController) Files(c *gin.Context) {
	err := controller.checkUserBucket(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error", "code": http.StatusInternalServerError, "data": nil})
		return
	}

	var req FileListingRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		log.Print(err)
		return
	}

	var results []minio.ObjectInfo
	fileInfos, err := controller.fileService.ListFiles(c, req.Path, false)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error", "code": http.StatusInternalServerError, "data": nil})
		return
	}

	for i := 0; i < len(fileInfos); i++ {
		if fileInfos[i].Metadata.Get("status") != "deleted" {
			results = append(results, fileInfos[i])
		}
	}

	c.JSON(http.StatusOK, gin.H{"data": results, "code": http.StatusOK, "msg": ""})
}

// 列出文件
func (controller *FileController) AllFiles(c *gin.Context) {
	err := controller.checkUserBucket(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error", "code": http.StatusInternalServerError, "data": nil})
		return
	}

	var req FileListingRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		log.Print(err)
		return
	}

	var results []minio.ObjectInfo
	fileInfos, err := controller.fileService.ListFiles(c, req.Path, true)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error", "code": http.StatusInternalServerError, "data": nil})
		return
	}

	for i := 0; i < len(fileInfos); i++ {
		if fileInfos[i].Metadata.Get("status") != "deleted" {
			results = append(results, fileInfos[i])
		}
	}

	c.JSON(http.StatusOK, gin.H{"data": results, "code": http.StatusOK, "msg": ""})
}

// 列出回收站文件
func (controller *FileController) BinFiles(c *gin.Context) {
	err := controller.checkUserBucket(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error", "code": http.StatusInternalServerError, "data": nil})
		return
	}

	fileInfos, err := controller.fileService.ListBinFiles(c, "") // bad performance
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error", "code": http.StatusInternalServerError, "data": nil})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": fileInfos, "code": http.StatusOK, "msg": ""})
}

// 删除文件
func (controller *FileController) Delete(c *gin.Context) {
	err := controller.checkUserBucket(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error", "code": http.StatusInternalServerError, "data": nil})
		return
	}

	var req FilesDeleteRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		log.Print(err)
		return
	}

	filenames := req.Filenames

	if len(filenames) == 0 {
		log.Println("Empty filename array!")
		c.JSON(http.StatusBadRequest, gin.H{"msg": "Can not pass in empty filename array", "code": http.StatusBadRequest, "data": nil})
		return
	}

	for i := 0; i < len(filenames); i++ {
		srcname := filenames[i]

		if srcname == "" {
			log.Println("Empty filenames!")
			c.JSON(http.StatusBadRequest, gin.H{"msg": "Filename must not be empty", "code": http.StatusBadRequest, "data": nil})
			return
		}

		err = controller.fileService.DeleteFile(c, srcname)
		if err != nil {
			log.Println(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error.", "data": nil, "code": http.StatusInternalServerError})
			return
		}
	}
	log.Println("Files deletion succeeded.")
	c.JSON(http.StatusOK, gin.H{"msg": "Files deletion succeeded.", "data": nil, "code": 200})

}

// 修改文件名
func (controller *FileController) ModifyFilename(c *gin.Context) {
	err := controller.checkUserBucket(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error", "code": http.StatusInternalServerError, "data": nil})
		return
	}

	var req FilenamesModifyRequest
	if err = c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "code": http.StatusBadRequest, "data": nil})
		return
	}

	fileInfos := req.FileInfos

	for i := 0; i < len(fileInfos); i++ {
		srcname := fileInfos[i].Srcname
		dstname := fileInfos[i].Dstname

		if srcname == "" || dstname == "" {
			log.Println("Empty filenames!")
			c.JSON(http.StatusBadRequest, gin.H{"msg": "Filename must not be empty", "code": http.StatusBadRequest, "data": nil})
			return
		}

		err = controller.fileService.ModifyFilename(c, srcname, dstname)
		if err != nil {
			log.Println(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error.", "data": nil, "code": http.StatusInternalServerError})
			return
		}

		err = controller.fileService.DeleteFile(c, srcname)
		if err != nil {
			log.Println(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error.", "data": nil, "code": http.StatusInternalServerError})
			return
		}
	}
	log.Println("Filenames modification succeeded")
	c.JSON(http.StatusOK, gin.H{"code": http.StatusOK, "data": nil, "msg": "Filenames modification succeeded"})

}

// 下载文件
func (controller *FileController) DownloadFile(c *gin.Context) {
	err := controller.checkUserBucket(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error", "code": http.StatusInternalServerError, "data": nil})
		return
	}

	var req FileListingRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "data": nil, "code": http.StatusBadRequest})
		log.Print(err.Error())
		return
	}

	filename := req.Path

	u, err := controller.fileService.GetFileURL(c, filename)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error", "code": http.StatusInternalServerError, "data": nil})
		return
	}
	HOST := "103.91.209.53"
	PORT := "31863"
	path := u.Scheme + "://" + HOST + ":" + PORT + u.Path + "?" + u.RawQuery
	c.JSON(http.StatusOK, gin.H{"data": path, "code": http.StatusOK, "msg": ""})
}

// 新建文件夹
func (controller *FileController) NewFolder(c *gin.Context) {
	err := controller.checkUserBucket(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error", "code": http.StatusInternalServerError, "data": nil})
		return
	}

	var req FileListingRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "data": nil, "code": http.StatusBadRequest})
		log.Print(err.Error())
		return
	}

	folderPath := req.Path

	err = controller.fileService.UploadEmptyFile(c, folderPath)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error", "data": nil, "code": http.StatusInternalServerError})
		return
	}

	c.JSON(http.StatusOK, gin.H{"code": http.StatusOK, "data": nil, "msg": "Folder created succeeded"})
}

// 将文件移入回收站
func (controller *FileController) MoveIntoBin(c *gin.Context) {
	err := controller.checkUserBucket(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error", "code": http.StatusInternalServerError, "data": nil})
		return
	}

	var req FilenamesModifyRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "code": http.StatusBadRequest, "data": nil})
		log.Println(err.Error())
		return
	}

	fileInfos := req.FileInfos

	if len(fileInfos) == 0 {
		log.Println("Empty fileInfo array!")
		c.JSON(http.StatusBadRequest, gin.H{"msg": "Can not pass in empty fileInfo array", "code": http.StatusBadRequest, "data": nil})
		return
	}

	for _, fileInfo := range fileInfos {

		srcname := fileInfo.Srcname
		dstname := fileInfo.Dstname

		if srcname == "" || dstname == "" {
			log.Println("Empty filenames!")
			c.JSON(http.StatusBadRequest, gin.H{"msg": "Filename must not be empty", "code": http.StatusBadRequest, "data": nil})
			return
		}
		log.Println(srcname, dstname)
		err = controller.fileService.MoveObjectToBin(c, srcname, dstname)
		if err != nil {
			log.Println(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error.", "data": nil, "code": http.StatusInternalServerError})
			return
		}

		err = controller.fileService.DeleteFile(c, srcname)
		if err != nil {
			log.Println(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error.", "data": nil, "code": http.StatusInternalServerError})
			return
		}

	}
	log.Println("Files deletion succeeded.")
	c.JSON(http.StatusOK, gin.H{"msg": "Files deletion succeeded.", "data": nil, "code": 200})
}

// 恢复文件（从回收站移出）
func (controller *FileController) MoveOutOfBin(c *gin.Context) {
	err := controller.checkUserBucket(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error", "code": http.StatusInternalServerError, "data": nil})
		return
	}

	var req FilesDeleteRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "code": http.StatusBadRequest, "data": nil})
		log.Println(err.Error())
		return
	}

	filenames := req.Filenames

	if len(filenames) == 0 {
		log.Println("Empty filename array!")
		c.JSON(http.StatusBadRequest, gin.H{"msg": "Can not pass in empty filename array", "code": http.StatusBadRequest, "data": nil})
		return
	}

	for i := 0; i < len(filenames); i++ {
		dstname := filenames[i]

		if dstname == "" {
			log.Println("Empty filenames!")
			continue
		}

		err = controller.fileService.MoveObjectOutOfBin(c, dstname)
		if err != nil {
			log.Println(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error.", "data": nil, "code": http.StatusInternalServerError})
			return
		}

		err = controller.fileService.DeleteFileFromBin(c, dstname)
		if err != nil {
			log.Println(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error.", "data": nil, "code": http.StatusInternalServerError})
			return
		}
	}
	log.Println("Files deletion succeeded.")
	c.JSON(http.StatusOK, gin.H{"msg": "Files deletion succeeded.", "data": nil, "code": 200})

}

// 检查是否存在用户对应的 bucket
func (controller *FileController) checkUserBucket(c *gin.Context) error {
	exists, err := controller.fileService.IsBucketExisted(c)
	if err != nil {
		log.Println("Failed to check bucket existence")
		return err
	}
	if !exists {
		err = controller.fileService.CreateBucket(c)
		if err != nil {
			log.Println("Failed to create bucket")
			return err
		}
	}
	exists, err = controller.fileService.IsBinBucketExisted(c)
	if err != nil {
		log.Println("Failed to check bucket existence")
		return err
	}
	if !exists {
		err = controller.fileService.CreateBinBucket(c)
		if err != nil {
			log.Println("Failed to create bucket")
			return err
		}
	}
	return nil
}
