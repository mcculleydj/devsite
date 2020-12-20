package controller

import (
	"backend/pkg/mail"
	"encoding/json"
	"fmt"
	"net/http"
)

func sendMail(w http.ResponseWriter, r *http.Request) {
	var body mail.Body

	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		WriteError(w, http.StatusBadRequest, "Unable to parse request body", err.Error())
		return
	}

	fmt.Println(body)

	err = mail.SendMail(body)
	if err != nil {
		WriteError(w, http.StatusInternalServerError, "Unable to send message", err.Error())
		return
	}
}
