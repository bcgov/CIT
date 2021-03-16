#!/bin/sh

./wait-for-it.sh $POSTGRES_HOST:$POSTGRES_PORT
python3 manage.py migrate

exec gunicorn --bind 0.0.0.0:8000 --worker-tmp-dir /dev/shm --workers=2 --threads=4 --worker-class=gthread manage:app
