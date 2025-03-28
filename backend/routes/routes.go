package routes

import (
	"cdserver/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	userController := controllers.NewUserController()

	v1 := router.Group("/api/v1")
	{
		users := v1.Group("/user")
		{
			users.POST("", userController.CreateUsers)
		}
	}
}
