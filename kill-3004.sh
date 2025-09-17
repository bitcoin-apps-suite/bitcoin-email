#!/bin/bash

# Kill processes on port 3004
echo "Killing processes on port 3004..."

# Find and kill processes using port 3004
lsof -ti:3004 | xargs kill -9 2>/dev/null

if [ $? -eq 0 ]; then
    echo "Processes on port 3004 have been terminated."
    osascript -e 'display notification "Port 3004 processes killed" with title "Bitcoin Email"'
else
    echo "No processes found on port 3004."
    osascript -e 'display notification "No processes found on port 3004" with title "Bitcoin Email"'
fi

# Keep terminal open briefly to show result
sleep 2