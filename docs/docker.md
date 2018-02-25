# Setup of development with Docker

TODO:

- change start command in docker container to include newrelic
- change environment for newrelic


## Setup with Docker

setup via docker. Initially a single dockerfile to keep it simple.

- Dockerfile
- ./app will hold the application, mounted into the container at /usr/src/app


### build Docker image

```
docker build -t dj-app .
```

### start Docker image with bash 

```
docker run -it --rm --name dj-app -v `pwd`/app:/usr/src/app dj-app bash
```

Note: improve this, the volume declaration could be better?

### build django skeleton

now inside the container, build the django project: 

```
cd /usr/src/app
django-admin startproject app .
```

- app: name of app
- .: path

This is necessary because the app folder already exists.

### start django server

```
docker run -it --rm --name dj-app -p 8000:8000 -v `pwd`/app:/usr/src/app dj-app 
```

### enter the running container

```
docker exec -it dj-app bash
```

### create a "polls" app inside the project

```
cd /usr/src/app
python manage.py startapp polls
```

### apply initial database migrations

Inside the container, do this: 

```
python manage.py migrate
```

### run tests

while container is running...

```
docker exec -it dj-app python manage.py test polls
```




## References

Django quick install: https://docs.djangoproject.com/en/2.0/intro/install/

Python in VS Code: https://code.visualstudio.com/docs/languages/python

Old, deprecated django docker image with recipe how to build your own: https://hub.docker.com/_/django/