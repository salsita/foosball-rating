#!/bin/bash

export DATABASE_URL="${DATABASE_URL}?sslmode=require"

env

(cd backend && npm start)
