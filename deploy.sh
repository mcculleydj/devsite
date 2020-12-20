#!/bin/bash


if [[ $1 == vue ]]; then
  echo "Building and deploying the Vue application..."
  cd frontend
  yarn run build
  rsync --delete -azv -e "ssh -i ~/.ssh/mcculleydj.dev.pem" dist/ ubuntu@54.203.119.188:/home/ubuntu/devsite
  ssh -i ~/.ssh/mcculleydj.dev.pem ubuntu@54.203.119.188 sudo systemctl restart nginx
  rm -rf dist
  cd ..
elif [[ $1 == api ]]; then
  echo "Building and deploying the Go API..."
  cd backend
  GOOS=linux GOARCH=amd64 go build cmd/main.go
  ssh -i ~/.ssh/mcculleydj.dev.pem ubuntu@54.203.119.188 sudo supervisorctl stop devsite-api
  scp -i ~/.ssh/mcculleydj.dev.pem main ubuntu@54.203.119.188:~/devsite-api
  ssh -i ~/.ssh/mcculleydj.dev.pem ubuntu@54.203.119.188 sudo supervisorctl start devsite-api
  rm main
  cd ..
fi