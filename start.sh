#!/bin/bash


PROXY_PORT=$PORT
unset PORT

cd backend
npm start &
npm run migrate up
cd ..

sed "s|%PORT%|$PROXY_PORT|g" nginx/nginx-heroku.conf > /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'
