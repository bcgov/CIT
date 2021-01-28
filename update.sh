#!/bin/bash

source ${HOME}/.bashrc

git pull origin master
docker-compose up --build -d
docker-compose restart cit-api cit-web

