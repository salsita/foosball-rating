#!/bin/bash

set -eu

PROXY_PORT=$PORT
unset PORT
export NODE_TLS_REJECT_UNAUTHORIZED=0
export DATABASE_URL="${DATABASE_URL}?sslmode=require"

cd backend
npm run create-test-db || true
npm run create-schema || true
npm start &
cd ..

sed "s|%PORT%|$PROXY_PORT|g" nginx/nginx-heroku.conf > /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'
