#!/bin/bash

./wait-for-it.sh ${POSTGRES_HOST}:5432

python3 manage.py ${EMAIL_TYPE}


