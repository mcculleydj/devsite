package controller

import "github.com/gorilla/mux"

// Router constructor function
func Router() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/api/mail", sendMail).Methods("POST")
	return router
}
