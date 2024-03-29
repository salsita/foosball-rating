#!/bin/bash

set -euo pipefail

(cd backend && npm run create-schema)

concurrently --kill-others-on-fail -n api,nginx \
  ./scripts/start-api.sh \
  ./scripts/start-nginx.sh

