#!/bin/bash

(cd frontend &&
  cp .env.docker.example .env &&
  npm ci --include=dev &&
  npm run build)

fe_files=frontend-files
rm -rf $fe_files
mkdir -p $fe_files
mv frontend/build/* $fe_files/
rm -rf frontend

(cd backend &&
  npm ci --include=dev &&
  npm run create-schema &&
  rm -rf node_modules &&
  npm ci)

