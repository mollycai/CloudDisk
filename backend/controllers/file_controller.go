package controllers

import (
	"cdserver/services"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
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

	err = controller.fileService.UploadFile(c)
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

	fileInfos, err := controller.fileService.ListFiles(c, req.Path)
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
	c.JSON(http.StatusOK, gin.H{"data": u.String(), "code": http.StatusOK, "msg": ""})
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
	return nil
}
