#!/bin/bash
echo docker-compose --version

./wait-for-it.sh ${POSTGRES_HOST}:5432

python3 manage.py migrate
python3 manage.py ${BUCKET_COMMAND}

if [ $? -eq 0 ]; then
    echo "Bucket command executed successfully"
else
    echo "Bucket command failed"
    exit 21
fi
exit 3
