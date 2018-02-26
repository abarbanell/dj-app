## Setup with pipenv

(TODO: document details)

### Rerequisites

- python 3.6.4, either installed system wide or via anaconda (see [anaconda.md](anaconda.md) for details)


### setup

- install dependencies (new relic, ...)
- environment

create an .env.rc file like this: 

```
echo executing $0

export STATSD_HOST="<YOUR-STATSDHOST>"
export STATSD_PREFIX="<e.g. dj2018.dev>"

export NEW_RELIC_APP_NAME="<e.g. dj2018d macbook>"
export NEW_RELIC_LICENSE_KEY="<YOUR-NEW_RELIC_LICENSE_KEY>"
```

## start development server

Development server without newrelic

```
pipenv shell
cd app
python manage.py runserver
```

Development server with newrelic

```
. .env.rc
pipenv shell
cd app
newrelic_admin run-program python manage.py runserver
```



