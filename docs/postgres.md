# Postgres howto

start docker container:

```
docker run --name dj-db -p 5432:5432 -v .`pwd`/data/:/var/lib/postgresql/data -e POSTGRES_PASSWORD=mypassword -d postgres
```

start postgres shell in container, create DB: 

```
$ docker exec -it dj-db psql -U postgres # Execute psql within the container
$ CREATE DATABASE djdb; # Create the database
$ GRANT ALL PRIVILEGES ON DATABASE "djdb" to postgres; # Grant privileges to existing (default) user
$ \l # Verify that the database was created with access privileges to "postgres"
```

start pgadmin: 

```
docker run --name dj-pgadmin4 \
           --link dj-db:postgres \
           -p 5050:5050 \
           -d fenglc/pgadmin4

```

general postgres commands: 

```
\list; # list databases
\l; # dto.
\connect djdb; # connect to database djdb
\dt; # show tables in current database
```



