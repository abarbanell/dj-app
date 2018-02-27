FROM python:latest

COPY ./requirements.txt /usr/src
WORKDIR /usr/src/app

RUN pip install -r ../requirements.txt 

ENV NEW_RELIC_APP_NAME="dj2018d docker"

EXPOSE 8000
CMD ["newrelic-admin", "run-program", "python", "manage.py", "runserver",  "0.0.0.0:8000"]
# CMD ["python", "-m", "django",  "--version"]
# CMD ["bash"]