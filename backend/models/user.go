package models

import "gorm.io/gorm"

type User struct {
	gorm.Model          // Adds Id, CreatedAt, UpdatedAt, DeletedAt fields
	Username     string `json:"username" gorm:"type:varchar(100)"`
	PasswordHash string `json:"password_hash" gorm:"type:varchar(100)"`
	Email        string `json:"email" gorm:"type:varchar(100);unique"`
}
