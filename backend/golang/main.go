package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/uptrace/bun"
)

type Todo struct {
	bun.BaseModel `bun:"table:todos,alias:t"`

	ID        int64  `bun:",pk,autoincrement" json:"id"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}

var db = InitDB()

func main() {
	// Connect to the database
	db := InitDB()
	defer db.Close()

	// Create a new router
	r := gin.Default()

	// Install CORS
	config := cors.DefaultConfig()
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"}
	config.AllowAllOrigins = true

	r.Use(cors.New(config))

	// Get all todos
	r.GET("/api/todos", getTodos)

	// Get a todo
	r.GET("/api//todos/:id", getTodo)

	// Create a todo
	r.POST("/api/todos", createTodo)

	// Update a todo
	r.PUT("/api/todos/:id", updateTodo)

	// Delete a todo
	r.DELETE("/api/todos/:id", deleteTodo)

	// Run the server
	r.Run(":8080")
}
