#!/bin/bash

# Bitcoin Email Launcher Script
# Opens project in Cursor, starts dev server, and launches Chrome with specific profile

PROJECT_DIR="/Volumes/Extreme SSD/Projects/bitcoin-email"
CHROME_PROFILE="Bitcoin Email Dev"  # Change this to your profile name
PORT=2040

echo "🚀 Launching Bitcoin Email Development Environment..."

# 1. Open project in Cursor
echo "📝 Opening project in Cursor..."
open -a "Cursor" "$PROJECT_DIR"

# 2. Start the development server in a new Terminal window
echo "🔧 Starting development server on port $PORT..."
osascript <<EOF
tell application "Terminal"
    activate
    do script "cd '$PROJECT_DIR' && npm run dev"
end tell
EOF

# 3. Wait a moment for the server to start
echo "⏳ Waiting for server to start..."
sleep 5

# 4. Open Chrome with specific profile
echo "🌐 Opening Chrome with profile: $CHROME_PROFILE..."
# For Chrome profiles, you need to use the profile directory name
# Usually found in ~/Library/Application Support/Google/Chrome/
open -a "Google Chrome" --args --profile-directory="Profile 1" "http://localhost:$PORT"
# Note: Replace "Profile 1" with your actual profile directory name
# You can find profile names by going to chrome://version in your browser

echo "✅ Bitcoin Email development environment launched!"
echo "📍 Project: $PROJECT_DIR"
echo "🌐 URL: http://localhost:$PORT"
echo "👤 Chrome Profile: $CHROME_PROFILE"