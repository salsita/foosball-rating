#!/bin/bash

set -eu

RUNTIME_DIR=heroku-runtime

rm -rf $RUNTIME_DIR
mkdir -p $RUNTIME_DIR

cd $RUNTIME_DIR

PROXY_PORT=$PORT
unset PORT
sed "s|%PORT%|$PROXY_PORT|g" ../nginx/nginx-heroku.conf > nginx.conf

mkdir -p /tmp/nginx/log
( cd /tmp/nginx/log && touch access.log error.log )

( tail -qF -n 0 /tmp/nginx/log/*.log ) &

curl -sSL https://github.com/salsita/nginx-heroku-build/releases/download/v1.0/nginx-heroku-20 \
  > nginx
chmod +x nginx
curl -sSL https://github.com/salsita/nginx-heroku-build/releases/download/v1.0/mime.types \
  > mime.types

# In nginx conf we want to use paths relative to project root.
# So we want to start nginx there
cd ..

# TODO now runs as root (as opposed to foosball user)
echo Starting nginx
./$RUNTIME_DIR/nginx -p $RUNTIME_DIR -c $RUNTIME_DIR/nginx.conf

