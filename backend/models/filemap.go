package models

// import "gorm.io/gorm"

type Filemap struct {
	// gorm.Model        // Adds Id, CreatedAt, UpdatedAt, DeletedAt fields
	Username string `json:"username" gorm:"type:varchar(100)"`
	Srcname  string `json:"password_hash" gorm:"type:varchar(100)"`
	Dstname  string `json:"email" gorm:"type:varchar(100);unique"`
}
