#!/bin/bash

(cd backend && npm run create-schema)

concurrently --kill-others-on-fail -n api,nginx \
  ./scripts/heroku-start-api.sh \
  ./scripts/heroku-start-nginx.sh

