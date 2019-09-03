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

Here's the list of the environment variables that could be configured.

```
process.env.DATABASE_URL
```
- stores the url to the database. If the variable is missing, the backend connects to our test database. 

```
process.env.FOOSBOT_TOKEN
process.env.FOOS_CHANNEL_NAME
```
- these variables are used by the slackbot to report the results of the matches. You can obtain the bot Token on slack settings page and then select the channel you'd like to deploy the bot on. 

```
process.env.MATCH_REPORT_PREFIX_SUFFIX_CONFIG
```
- used to configure prefixes and suffixes of the match report messages (see above) based on the players on the winning team.
- the app expects quadruplets of player1, player2, prefix and suffix to be encoded in the environment variable.
- use `,` to separate the values within a quadruplet (`player1,player2,prefix,suffix`) and `;` to separate the quadruplets (`quadruplet1;quadruplet2`). Note: the order of players in the quadruplet does not matter. 
- e.g. if you want to prefix the message with "WE WON!" and suffix it with "We are so happy" whenever Peter and Thomas win, and prefix it with "J+R" and suffix it with "Forever in love" when John and Rebecca win, use the following configuration:  
  ```
  MATCH_REPORT_PREFIX_SUFFIX_CONFIG=Peter,Thomas,WE WON!,We are so happy;John,Rebecca,J+R,Forever in love
  ```
  
