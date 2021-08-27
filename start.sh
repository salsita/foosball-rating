#!/bin/bash

set -eu

PROXY_PORT=$PORT
unset PORT

cd backend
NODE_TLS_REJECT_UNAUTHORIZED=0 DATABASE_URL="${DATABASE_URL}?sslmode=require" npm start &
cd ..

sed "s|%PORT%|$PROXY_PORT|g" nginx/nginx-heroku.conf > /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'
