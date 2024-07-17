This is a sample Todo app (is that the new "hello world" of web apps?) written in Golang (using the Gin web stack and the Bun DB layer/ORM). The database layer is Postgres.

To run the stack, you can simply run `docker compose up`. However, for the first run, you'll need to run database migrations using the `migrate` tool (https://github.com/golang-migrate/migrate).

First, start the DB service in the Compose stack with the following command:

`docker compose start db`

After Postgres has started and you have installed the `migrate` tool, run the following command (from the root of this repository) to perform the initial migration:

`migrate -path db/migrations/ -database "postgresql://postgres:password@localhost:5432/postgres?sslmode=disable" -verbose up`

You should see some output similar to the following:

```
2024/07/16 17:51:59 Start buffering 1/u initial
2024/07/16 17:51:59 Read and execute 1/u initial
2024/07/16 17:51:59 Finished 1/u initial (read 8.915287ms, ran 19.403607ms)
2024/07/16 17:51:59 Finished after 30.154764ms
2024/07/16 17:51:59 Closing source and database
```

Now, you should be able to start the full stack with:

```
docker compose up
```

Browse to http://localhost:8080 to see the app!

Note: for now, only an API layer is present, viewable at `http://localhost:8080/api/todos` (see `main.go` for the routes supported). Coming soon: a React frontend!
