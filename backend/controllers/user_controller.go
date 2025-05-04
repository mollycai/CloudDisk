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
		log.Println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "code": http.StatusBadRequest, "data": nil})
		return
	}

	user := models.User{
		Email:    req.Email,
		Username: req.Username,
	}

	if err := controller.userService.CreateUser(&user, req.Password); err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"msg": "Internal error", "code": http.StatusInternalServerError, "data": nil})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"code": http.StatusCreated, "msg": "User created successed", "data": nil})
}

// 登录
func (controllers *UserController) Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error(), "code": http.StatusBadRequest, "data": nil})
		log.Print(err.Error())
		return
	}

	user := models.User{
		Username: req.Username,
	}

	id, err := controllers.userService.Login(&user, req.Password)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "code": http.StatusInternalServerError, "data": nil})
		log.Print(err.Error())
		return
	}

	token, err := utils.GenerateToken(req.Username, id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error(), "code": http.StatusInternalServerError, "data": nil})
		log.Print(err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{"code": http.StatusOK, "msg": "Login successed", "data": token})
}
