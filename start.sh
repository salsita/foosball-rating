#!/bin/bash

set -eu

PROXY_PORT=$PORT
unset PORT
set -x
export DATABASE_URL="${DATABASE_URL}?sslmode=require&ssl=true&rejectUnauthorized=false"
set +x

cd backend
npm run create-test-db || true
npm run create-schema
npm start &
cd ..

sed "s|%PORT%|$PROXY_PORT|g" nginx/nginx-heroku.conf > /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'
