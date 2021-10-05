#!/bin/bash

(cd frontend &&
  npm ci --include=dev &&
  npm run build &&
  cp .env.docker.example .env)

(cd backend &&
  npm ci --include=dev &&
  npm run create-schema)

