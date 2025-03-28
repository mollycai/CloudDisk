package main

import (
	"cdserver/config"
	"cdserver/routes"

	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()

	// initialize database
	config.InitDB()

	routes.SetupRoutes(router)

	router.Run(":8080")

}
