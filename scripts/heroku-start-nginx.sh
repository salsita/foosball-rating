#!/bin/bash

set -eu

RUNTIME_DIR=heroku-runtime

rm -rf $RUNTIME_DIR
mkdir -p $RUNTIME_DIR

cd $RUNTIME_DIR

erb ../nginx/nginx-heroku.conf > nginx.conf

mkdir -p /tmp/nginx/log
( cd /tmp/nginx/log && touch access.log error.log )

( tail -qF -n 0 /tmp/nginx/log/*.log ) &

curl -sSL https://github.com/salsita/nginx-heroku-build/releases/download/v1.0/nginx-heroku-20 \
  > nginx
chmod +x nginx
curl -sSL https://github.com/salsita/nginx-heroku-build/releases/download/v1.0/mime.types \
  > mime.types

# TODO now runs as root (as opposed to foosball user)
echo Starting nginx
./nginx -p . -c nginx.conf

