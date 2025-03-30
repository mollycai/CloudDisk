package services

import (
	"cdserver/config"
	"cdserver/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserService struct {
	db *gorm.DB
}

func NewUserService() *UserService {
	return &UserService{
		db: config.GetDB(),
	}
}

func (s *UserService) CreateUser(user *models.User, password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.PasswordHash = string(hashedPassword)
	return s.db.Create(user).Error
}

func (s *UserService) Login(user *models.User, password string) (uint, error) {

	var userInfo models.User

	if err := s.db.Where("username = ?", user.Username).First(&userInfo).Error; err != nil {
		return 0, err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(userInfo.PasswordHash), []byte(password)); err != nil {
		return 0, err
	}

	return userInfo.ID, nil
}
