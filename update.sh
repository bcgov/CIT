#!/bin/bash

source ${HOME}/.bashrc

git pull origin master
docker-compose up --build -d
docker-compose restart web cit-web

