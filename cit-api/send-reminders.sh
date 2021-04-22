#! /bin/bash

./wait-for-it.sh ${POSTGRES_HOST}:5432

python3 bootstrap.py send-update-reminders