package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

var Client *minio.Client

func InitMinioClient() {
	// Load .env file
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	accessKey := os.Getenv("MINIO_ACCESS_KEY")
	secretKey := os.Getenv("MINIO_SECRET_KEY")
	host := os.Getenv("MINIO_HOST")
	port := os.Getenv("MINIO_PORT")

	endpoint := fmt.Sprintf("%s:%s", host, port)

	client, err := minio.New(endpoint, &minio.Options{
		Creds: credentials.NewStaticV4(accessKey, secretKey, ""),
	})

	if err != nil {
		panic("Failed to connect to minio: " + err.Error())
	}

	Client = client
	fmt.Println("MinIO connected successfully")
}

func GetMinIOClient() *minio.Client {
	return Client
}
