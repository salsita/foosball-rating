#!/bin/bash

npm run install:children

(cd backend && ls -hal backend/node_modules/.bin)

(cd frontend &&
  npm run build &&
  cp .env.docker.example .env)

(cd backend && npm run create-schema)
