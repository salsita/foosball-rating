#!/bin/bash

set -euo pipefail

env

(cd frontend &&
  npm ci --include=dev &&
  npm run build)

fe_files=frontend-files
rm -rf $fe_files
mkdir -p $fe_files
mv frontend/build/* $fe_files/
rm -rf frontend/*
mkdir frontend/build
mv $fe_files/* frontend/build/
rm -rf $fe_files

(cd backend &&
  npm ci --include=dev &&
  npm run create-schema &&
  rm -rf node_modules &&
  npm ci)

