package main

import (
	"cdserver/config"
	"cdserver/middleware"
	"cdserver/routes"

	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()

	// initialize database
	config.InitDB()

	// initialize minio
	config.InitMinioClient()

	// initialize logger
	middleware.NewLogger(2)

	routes.SetupRoutes(router)

	router.Run(":31866")

}
