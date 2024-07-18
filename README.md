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

The API is available at http://localhost:8080/api (see main.go for routes).

In the frontend folder, there is a very minimal (for now) UI for the backend API. To install, you'll need a recent version of Node.js installed (I was working with v21.6.0). You will need `yarn` as well:

`npm install -G yarn`

Then from the frontend folder, run:

`yarn install`

And finally, with the backend running (see above), type:

`yarn dev`

And navigate to http://localhost:5173

TODO:

- Improve the appearance/functionality of the frontend
- Dockerize the frontend so that the backend can serve it as a static page
