#!/bin/bash

if test "$DATABASE_SSL" == "true" ; then
  PGSSLMODE=require
  authRejection='--no-reject-unauthorized'
else
  PGSSLMODE=disable
  authRejection=''
fi

export PGSSLMODE

ts-node node_modules/.bin/node-pg-migrate -j ts $authRejection $@

