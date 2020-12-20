package main

import (
	"backend/internal/controller"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"time"
)

func main() {
	server := &http.Server{
		Handler:      controller.Router(),
		Addr:         "127.0.0.1:3001",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	go server.ListenAndServe()
	fmt.Println("API listening on port 3001...")

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	<-c

	fmt.Println("\nSIGTERM received...")
}
