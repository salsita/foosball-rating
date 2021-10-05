#!/bin/bash

npm run install:children

(cd frontend &&
  npm run build &&
  cp .env.docker.example .env &&
  rm -rf /srv &&
  mkdir /srv &&
  cp -r build/* /srv/)

(cd backend && npm run create-schema)
