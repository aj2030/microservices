#!/bin/sh

# See if application is running on localhost 3000
telnet localhost 3000
if [ $? -eq 0 ]; then
    echo "Application is running on localhost 3000"
else
    echo "Application is not running on localhost 3000"
    exit 1
fi

# Now check if the application is reachable
response_code=$(curl -o /dev/null -s -w "%{http_code}" http://localhost:3000/shallow/health/check)
if [ $response_code -eq 200 ]; then
    echo "Shallow health check is successful. Application is up and reachable on localhost 3000"
else
    echo "Shallow health check has failed. Application is unreachable."
    exit 1
fi