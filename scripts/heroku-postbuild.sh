#!/bin/bash

(cd frontend &&
  cp .env.docker.example .env &&
  npm ci --include=dev &&
  npm run build)

(cd backend &&
  npm ci --include=dev &&
  npm run create-schema)

