package controllers

import (
	"cdserver/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type FileController struct {
	fileService *services.FileService
}

func NewFileController() *FileController {
	return &FileController{
		fileService: services.NewFileService(),
	}
}

func (controllers *FileController) Upload(c *gin.Context) {
	c.JSON(http.StatusOK, "good")
}
