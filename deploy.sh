#!/bin/bash

echo "Building and deploying the Vue application..."

yarn run build

rsync --delete -azv -e "ssh -i ~/.ssh/mcculleydj.dev.pem" dist/ ubuntu@54.203.119.188:/home/ubuntu/devsite

ssh -i ~/.ssh/mcculleydj.dev.pem ubuntu@54.203.119.188 sudo systemctl restart nginx

rm -rf dist
