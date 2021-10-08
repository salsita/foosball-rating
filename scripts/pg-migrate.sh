#!/bin/bash

set -euo pipefail

if test -z "$DATABASE_URL" ; then
  echo "Error: DATABASE_URL not set" >&2
  exit 1
fi

if test "$DATABASE_SSL" == "true" ; then
  PGSSLMODE=require
  authRejection='--no-reject-unauthorized'
else
  PGSSLMODE=disable
  authRejection=''
fi

export PGSSLMODE

ts-node node_modules/.bin/node-pg-migrate -j ts $authRejection $@

