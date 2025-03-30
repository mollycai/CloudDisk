package services

import (
	"cdserver/config"

	"gorm.io/gorm"
)

type FileService struct {
	db *gorm.DB
}

func NewFileService() *FileService {
	return &FileService{
		db: config.GetDB(),
	}
}
