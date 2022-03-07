#!/bin/bash

./wait-for-it.sh ${POSTGRES_HOST}:5432

python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py ${BUCKET_COMMAND}

