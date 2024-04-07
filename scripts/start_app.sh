#!/bin/sh

# Start the app
node ../customer/customer_service.js & > /dev/null
response_code=$?


if [ $response_code -eq 0 ]; then
    echo "Application startup is complete. Running on port 3000"
    exit 0
else
    echo "Application startup failed. Please check the logs."
    exit 1
fi