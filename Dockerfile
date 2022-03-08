FROM python:3.6-slim-buster as compile

RUN apt-get update
RUN apt-get install -y --no-install-recommends libproj-dev gdal-bin libpq-dev libpython3-dev build-essential gcc

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput

CMD ./entrypoint.prod.sh

