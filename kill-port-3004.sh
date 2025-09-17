#!/bin/bash

# Kill Port 3004 - Bitcoin Email Helper
# This script kills any process running on port 3004

echo "🔴 Killing processes on port 3004..."

# Find and kill processes on port 3004
PIDS=$(lsof -ti:3004 2>/dev/null)

if [ -z "$PIDS" ]; then
    echo "✅ No processes found running on port 3004"
    osascript -e 'display notification "No processes running on port 3004" with title "Kill Port 3004" sound name "Glass"'
else
    echo "🎯 Found processes: $PIDS"
    for PID in $PIDS; do
        echo "💀 Killing process $PID..."
        kill -9 $PID 2>/dev/null
    done
    
    # Verify they're dead
    sleep 1
    REMAINING=$(lsof -ti:3004 2>/dev/null)
    
    if [ -z "$REMAINING" ]; then
        echo "✅ Successfully killed all processes on port 3004"
        osascript -e 'display notification "Successfully killed processes on port 3004" with title "Kill Port 3004" sound name "Glass"'
    else
        echo "⚠️  Some processes may still be running"
        osascript -e 'display notification "Some processes may still be running on port 3004" with title "Kill Port 3004" sound name "Basso"'
    fi
fi

echo "🏁 Done!"

# Keep terminal open for 2 seconds to see output
sleep 2