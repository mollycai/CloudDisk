package services

import (
	"cdserver/config"

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

func Upload() error {

	return nil
}
