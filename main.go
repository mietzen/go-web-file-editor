package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/file", func(w http.ResponseWriter, r *http.Request) {
		filename := "example.yml"
		if r.Method == http.MethodGet {
			// Serve file content
			http.ServeFile(w, r, filename)
		} else if r.Method == http.MethodPost {
			// Save file content
			body, err := io.ReadAll(r.Body)
			if err != nil {
				http.Error(w, "Failed to read request body", http.StatusInternalServerError)
				return
			}
			if err := os.WriteFile(filename, body, 0644); err != nil {
				http.Error(w, "Failed to save file", http.StatusInternalServerError)
				return
			}
			w.WriteHeader(http.StatusOK)
		}
	})

	port := ":8081"
	fmt.Println("Go server running at http://localhost" + port)
	http.ListenAndServe(port, nil)
}
