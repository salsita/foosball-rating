#!/bin/bash

cd backend
npm start &
cd ../frontend
serve -s -p $PORT build/
