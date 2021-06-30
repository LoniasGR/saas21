# Containers for development and production

## Contains

* Database (postgres)
* PgAdmin4 (GUI for the database)

## How to use

1) First a `.env` file is needed. This needs to contain the following:

```bash
POSTGRES_PASSWORD=<your_password_1>
PGADMIN_DEFAULT_EMAIL=<your_email>
PGADMIN_DEFAULT_PASSWORD=<your_password_2>
```

2) Once you have the `.env` file run

```bash
docker-compose -f docker/docker-compose.yml --env-file docker/.env up
```

3) Login the pgadmin page on `localhost:5050`, add a new Server, which contains the db.
