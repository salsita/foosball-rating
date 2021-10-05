#!/bin/bash

npm run install:children

(cd frontend &&
  npm run build &&
  cp .env.docker.example .env)

(cd backend && npm run create-schema)
