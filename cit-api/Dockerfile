FROM python:3.6-slim-buster as compile

WORKDIR /app

RUN apt-get update
RUN apt-get install -y --no-install-recommends libproj-dev gdal-bin libpq-dev libpython3-dev build-essential gcc

# install python dependencies
COPY ./requirements.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /usr/src/app/wheels -r requirements.txt

COPY . .

RUN python3 manage.py collectstatic --noinput

CMD ./entrypoint.prod.sh

