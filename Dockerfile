FROM python:latest

WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install django 



EXPOSE 8000
CMD ["python", "manage.py", "runserver",  "0.0.0.0:8000"]
# CMD ["python", "-m", "django",  "--version"]
# CMD ["bash"]