package main

import (
	"context"
	"database/sql"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func getTodos(c *gin.Context) {
	var todos = make([]Todo, 0)

	var ctx = context.Background()
	err := db.NewSelect().Model(&todos).Scan(ctx)

	if err != nil {
		panic(err)
	}

	c.IndentedJSON(http.StatusOK, todos)
}

func getTodo(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	todo := new(Todo)
	err = db.NewSelect().Model(todo).Where("id = ?", id).Scan(context.Background())

	if err != nil {
		if err == sql.ErrNoRows {
			c.IndentedJSON(http.StatusNotFound, gin.H{
				"error": "Todo not found",
			})
		} else {
			c.IndentedJSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
		}
		return
	}

	c.IndentedJSON(http.StatusOK, todo)
}

func createTodo(c *gin.Context) {
	var todo Todo
	if err := c.BindJSON(&todo); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	_, err := db.NewInsert().Model(&todo).Exec(context.Background())
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.IndentedJSON(http.StatusCreated, todo)
}

func updateTodo(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	var todo Todo
	if err := c.BindJSON(&todo); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	todo.ID = id

	res, err := db.NewUpdate().Model(&todo).WherePK().Exec(context.Background())

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	if rows, _ := res.RowsAffected(); rows == 0 {
		c.IndentedJSON(http.StatusNotFound, gin.H{
			"error": "Todo not found",
		})
		return
	}

	c.IndentedJSON(http.StatusOK, todo)
}

func deleteTodo(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	todo := Todo{ID: id}

	res, err := db.NewDelete().Model(&todo).WherePK().Exec(context.Background())

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	if rows, _ := res.RowsAffected(); rows == 0 {
		c.IndentedJSON(http.StatusNotFound, gin.H{
			"error": "Todo not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Todo deleted",
	})
}
