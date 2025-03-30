package controllers

import (
	"cdserver/models"
	"cdserver/services"
	"cdserver/utils"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserController struct {
	userService *services.UserService
}

type SigninRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func NewUserController() *UserController {
	return &UserController{
		userService: services.NewUserService(),
	}
}

func (controller *UserController) Signup(c *gin.Context) {
	var req models.SignupRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := models.User{
		Email:    req.Email,
		Username: req.Username,
	}

	if err := controller.userService.CreateUser(&user, req.Password); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, models.SignupResponse{
		Message: "Signup succeeded",
	})
}

func (controllers *UserController) Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		log.Print(err)
		return
	}

	user := models.User{
		Username: req.Username,
	}

	id, err := controllers.userService.Login(&user, req.Password)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		log.Print(err)
		return
	}

	token, err := utils.GenerateToken(req.Username, id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		log.Print("Line 73", err)
		return
	}

	c.JSON(http.StatusOK, models.LoginResponse{
		Token: token,
	})

}
