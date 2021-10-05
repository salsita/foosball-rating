#!/bin/bash

(cd backend && npm run create-schema)

# TODO install concurrently separatly as in federato
# or keep it as non dev dep in root package.json hiir?
npm run concurrently --kill-others-on-fail -n api,nginx \
  ./heroku-start-api.sh \
  ./heroku-start-nginx.sh

