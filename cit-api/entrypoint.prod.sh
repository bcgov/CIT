#!/bin/sh

./wait-for-it.sh ${POSTGRES_HOST}:5432
python3 manage.py migrate

# exec gunicorn --bind 0.0.0.0:8000 --worker-tmp-dir /dev/shm --workers=2 --keep-alive 5 --timeout 60 --log-level=debug --threads=4 --worker-class=gthread admin.wsgi
exec uwsgi --http :8000 --master --processes 4 --threads 2 --wsgi-file admin.wsgi
