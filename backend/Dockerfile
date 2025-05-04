FROM golang:1.24-alpine

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o /go/bin/app

EXPOSE 8080

CMD ["/go/bin/app"]