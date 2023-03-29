#!/bin/bash

./cit-api/wait-for-it.sh ${POSTGRES_HOST}:5432

python3 cit-api/manage.py ${EMAIL_TYPE}


