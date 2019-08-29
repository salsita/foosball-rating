# foosball-rating

Foosball rating app backend.

## Setting up

The backed uses a PostgreSQL database for data storage purposes.

To setup the DB schema, run the SQL scripts in the `db_migrations` folder in an ascending order, e.g.:
```
psql -U username -d dbName -f ./db_migrations/01-create-users.sql
psql -U username -d dbName -f ./db_migrations/02-create-matches.sql
etc.
```

To configure your database, either edit the `./storage/db/db-config.js` with your DB configuration, or configure it as an environment variable.


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

## Environment variables
Here's the list of the envirnment variables that could to be configured.

```
process.env.DATABASE_URL
```
- stores the url to the database. If the variable is missing, the backend connects to our test database. 

```
process.env.FOOSBOT_TOKEN
process.env.FOOS_CHANNEL_NAME
```
- these variables are used by the slackbot to announce the results of the matches You can obtain the bot Token on slack settings page and then select the channel you'd like to deploy the bot on. 


