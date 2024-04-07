#!/bin/sh

# Wait for the service to start
curl -o /dev/null -w "%{http_code}" http://localhost:3000/shallow/health/check
response_code=$?

if [ $response_code -eq 200 ]; then
    echo "Success"
    exit 0
else
    echo "Failure"
    exit 1
fi