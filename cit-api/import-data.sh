#! /bin/bash

./wait-for-it.sh db:5432

python3 manage.py bootstrap

