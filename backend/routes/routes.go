package routes

import (
	"cdserver/controllers"
	"cdserver/middleware"

	"github.com/gin-gonic/gin"
	// "github.com/golang-jwt/jwt/v5"
)

func SetupRoutes(router *gin.Engine) {
	userController := controllers.NewUserController()
	fileController := controllers.NewFileController()

	// public route
	router.POST("/user/login", userController.Login)
	router.POST("/user/signup", userController.Signup)

	authGroup := router.Group("/")
	authGroup.Use(middleware.JWTAuthMiddleware())
	files := authGroup.Group("/file")
	{
		files.POST("/upload", fileController.Upload)
		files.POST("/files", fileController.Files)
		files.POST("/delete", fileController.Delete)
		files.POST("/modify", fileController.ModifyFilename)
		files.POST("/move", fileController.ModifyFilename)
		files.POST("/download", fileController.DownloadFile)
		files.POST("/newfolder", fileController.NewFolder)
	}
}
