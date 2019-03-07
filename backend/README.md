# foosball-rating

Foosball rating app backend.

## Setting up

The backed uses a PostgreSQL database for data storage purposes.

To setup the DB schema, run the following SQL scripts:
```
./db_migrations/create-matches.sql
./db_migrations/create-users.sql
```

To configure the application, edit the `./storage/db/db-config.js` file and fill it with your DB configuration.

## Running

The `npm` (https://www.npmjs.com/) is required for running the backend.

First, install all the required dependencies:

```
npm i
```

Start the server:
```
npm start
```

The port on which the server is listening is reported in the console output.
