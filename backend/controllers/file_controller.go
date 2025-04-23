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

func (controller *FileController) Files(c *gin.Context) {
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
	fileInfos, err := controller.fileService.ListFiles(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"files": fileInfos})
}
