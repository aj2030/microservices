#!/bin/sh

# Send the request and capture the HTTP status code
response_code=$(curl -o /dev/null -s -w "%{http_code}" http://localhost:3000/shallow/health/check)

# Print the HTTP status code
echo "The HTTP status code is: $response_code"

if [ $response_code -eq 200 ]; then
    echo "Shallow health check is successful. Application is up and reachable on localhost 3000"
    exit 0
else
    echo "Shallow health check has failed. Application is unreachable."
    exit 1
fi