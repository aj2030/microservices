#!/bin/sh

# Kill the node process
killall node

if [ $? -eq 0 ]; then
    echo "Node process killed successfully"
else
    echo "Node process kill failed. Please check the logs."
    exit 1
fi
