package mail

import (
	"fmt"
	"log"
	"os"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

// Body represents the POST body for sendMail requests
type Body struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

// SendMail uses SendGrid to send an email
func SendMail(body Body) error {
	from := mail.NewEmail("DevSite", "contact@mcculleydj.dev")
	subject := "New Message"
	to := mail.NewEmail("Me", os.Getenv("EMAIL"))
	plainTextContent := fmt.Sprintf("Name: %s\nEmail: %s\nMessage: %s", body.Name, body.Email, body.Message)
	message := mail.NewSingleEmail(from, subject, to, plainTextContent, "")
	client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
	response, err := client.Send(message)
	if err != nil {
		log.Println(err)
	} else {
		fmt.Println(response.StatusCode)
		fmt.Println(response.Body)
		fmt.Println(response.Headers)
	}
	return err
}
