# Setup of development with Docker

TODO:

create docker-compose.yml to hold:

- web container
- postgres DB service
- REDIS pubsub and cache service

## Setup with Docker and Docker Compose

Dockerfile will build the web container, docker-compose.yml will rpovision the services like Postgres, Redis and setup the networking. See description [here](https://docs.docker.com/compose/django/#create-a-django-project).

We change the project directory to /usr/src/app and import the app as a volume (i.e. the contaioner holds only infrastructure, not the application code)

### Dockerfile

- ./app will hold the application, mounted into the container at /usr/src/app
- which means that app changes will reflect immediately (verify hot reloading also works for adding static assets)
- app will be exposed on port 8000

### build Docker image and docker-compose environment

```bash
# quick start
docker-compose up

# long start with rebuild of containers / pull images, pip install
docker-compose up --build
```

This is over 320 MB to download, don't do this when roaming, and have patience if you are in the train...

### start bash in the web container

```bash
docker-compose exec web bash
```

This allows you to run commands in the container, e.g. makemigrations, etc.

### build django skeleton

now inside the container, build the django project:

```bash
cd /usr/src/app
django-admin startproject app .
```

- app: name of app
- .: path

This is necessary because the app folder already exists.

### create a "polls" app inside the project

```bash
# enter web container
docker-compose exec web bash

# inside the container
cd /usr/src/app
python manage.py startapp polls
```

### apply initial database migrations

```bash
# enter web container
docker-compose exec web bash

# inside the container
python manage.py migrate
```

### run tests

while container is running...

```bash
docker-compose exec web python manage.py test app -v2
```

### upgrade requirements

inside the web container

```bash
pip install --upgrade -r requirements.txt
```

### freeze requirements

inside the web container

```bash
pip freeze > requirements.txt
```


## References

[Django / Postgres / Docker description](https://docs.docker.com/compose/django/#create-a-django-project)

[Django quick install](https://docs.djangoproject.com/en/2.0/intro/install/)

[Python in VS Code](https://code.visualstudio.com/docs/languages/python)

Old, deprecated django docker image with recipe how to [build your own](https://hub.docker.com/_/django/)