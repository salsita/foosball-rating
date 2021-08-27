#!/bin/bash

set -eu

PROXY_PORT=$PORT
unset PORT
export DATABASE_URL="${DATABASE_URL}?sslmode=require"

cd backend
npm start &
cd ..

sed "s|%PORT%|$PROXY_PORT|g" nginx/nginx-heroku.conf > /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'
