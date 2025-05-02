package controllers

import (
	"cdserver/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type FileController struct {
	fileService *services.FileService
}

type UploadRequest struct {
}

type FileDeleteRequest struct {
	Filename string `json:"filename" binding:"required"`
}

type FilenameModifyRequest struct {
	FileDeleteRequest
	Newname string `json"newname"`
}

func NewFileController() *FileController {
	return &FileController{
		fileService: services.NewFileService(),
	}
}

func (controller *FileController) Upload(c *gin.Context) {
	err, exists := controller.fileService.IsBucketExisted(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
	if !exists {
		err = controller.fileService.CreateBucket(c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
	}
	controller.fileService.UploadFile(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Upload successful
	c.JSON(http.StatusOK, gin.H{"message": "File uploaded successfully."})
}

// 列出文件
func (controller *FileController) Files(c *gin.Context) {
	err, exists := controller.fileService.IsBucketExisted(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "data": nil, "code": http.StatusInternalServerError})
	}
	if !exists {
		err = controller.fileService.CreateBucket(c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "data": nil, "code": http.StatusInternalServerError})
		}
	}
	fileInfos, err := controller.fileService.ListFiles(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "code": http.StatusInternalServerError, "data": nil})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": fileInfos, "code": http.StatusOK, "msg": nil})
}

// 删除文件
func (controller *FileController) Delete(c *gin.Context) {
	err, exists := controller.fileService.IsBucketExisted(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
	if !exists {
		err = controller.fileService.CreateBucket(c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
	}
	err = controller.fileService.DeleteFile(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "File deleted successfully.", "data": nil, "code": 200})
}

// 修改文件名

// 移动文件
