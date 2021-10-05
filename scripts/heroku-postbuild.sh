#!/bin/bash

#npm run install:children
cd frontend
npm install
cd ../backend
npm install
cd ..

(cd backend && ls -hal backend/node_modules/)

(cd frontend &&
  npm run build &&
  cp .env.docker.example .env)

(cd backend && npm run create-schema)
