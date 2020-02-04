# Environment variables

Here's the list of the environment variables that could be configured.
## Database
```
DB_PROD = <true, if application will run on production config> 
```
### Test database config
```
DB_TEST_HOST = 
DB_TEST_PORT = 
DB_TEST_DB = 
DB_TEST_USER = 
DB_TEST_PASS = 
```
### Production database config
```
DATABASE_URL =
``` 
or if missing, then:
```
DB_PROD_HOST = 
DB_PROD_PORT = 
DB_PROD_DB = 
DB_PROD_USER = 
DB_PROD_PASS = 
DB_SSL = <true/false>
```

## Settings
### Slackbot
```
FOOSBOT_TOKEN =
FOOS_CHANNEL_NAME =
```
- these variables are used by the slackbot to report the results of the matches. You can obtain the bot Token on slack settings page and then select the channel you'd like to deploy the bot on. 

### Report messages
```
MATCH_REPORT_PREFIX_SUFFIX_CONFIG =
```
- used to configure prefixes and suffixes of the match report messages (see above) based on the players on the winning team.
- the app expects quadruplets of player1, player2, prefix and suffix to be encoded in the environment variable.
- use `,` to separate the values within a quadruplet (`player1,player2,prefix,suffix`) and `;` to separate the quadruplets (`quadruplet1;quadruplet2`). Note: the order of players in the quadruplet does not matter. 
- e.g. if you want to prefix the message with "WE WON!" and suffix it with "We are so happy" whenever Peter and Thomas win, and prefix it with "J+R" and suffix it with "Forever in love" when John and Rebecca win, use the following configuration:  
  ```
  MATCH_REPORT_PREFIX_SUFFIX_CONFIG=Peter,Thomas,WE WON!,We are so happy;John,Rebecca,J+R,Forever in love
  ```
