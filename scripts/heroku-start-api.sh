#!/bin/bash

# TODO set this only for non-prod?
# has production heroku postgres proper certificate?
export NODE_TLS_REJECT_UNAUTHORIZED=0

env

(cd backend && npm start)
