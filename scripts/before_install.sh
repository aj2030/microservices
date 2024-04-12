#!/bin/sh

mkdir /home/ubuntu/microservices

if [ $? -eq 0 ]; then
    echo "Directory created successfully"
else
    echo "Directory creation failed. Please check the logs."
    exit 1
fi

