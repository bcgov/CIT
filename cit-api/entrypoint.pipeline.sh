#!/bin/bash

./wait-for-it.sh ${POSTGRES_HOST}:5432

mkdir -p data/import/bucket_1

python3 manage.py migrate
python3 manage.py bucket_1
python3 manage.py runserver 0.0.0.0:8000

