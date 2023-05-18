#!/bin/sh

./wait-for-it.sh ${POSTGRES_HOST}:5432
python3 manage.py migrate

exec gunicorn --bind 0.0.0.0:8000 --worker-tmp-dir /dev/shm --workers=2 --timeout=60 --threads=4 --worker-class=gthread admin.wsgi
