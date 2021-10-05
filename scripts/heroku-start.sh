#!/bin/bash

(cd backend && npm run create-schema)

# TODO install concurrently separatly as in federato
# or keep it as non dev dep in root package.json hiir?
# TODO 2 - is there better way to run it then using
# ./node_modules/.bin ?
./node_modules/.bin/concurrently --kill-others-on-fail -n api,nginx \
  ./scripts/heroku-start-api.sh \
  ./scripts/heroku-start-nginx.sh

