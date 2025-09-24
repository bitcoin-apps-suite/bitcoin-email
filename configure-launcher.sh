#!/bin/bash

echo "🔧 Bitcoin Email Launcher Configuration"
echo "======================================="
echo ""
echo "This script will help you configure the Chrome profile for the launcher."
echo ""
echo "Available Chrome profiles on your system:"
echo ""

# List Chrome profiles
CHROME_DIR="$HOME/Library/Application Support/Google/Chrome"
if [ -d "$CHROME_DIR" ]; then
    echo "Profile directories found:"
    ls -d "$CHROME_DIR"/Profile* "$CHROME_DIR/Default" 2>/dev/null | while read dir; do
        profile_name=$(basename "$dir")
        # Try to get the actual profile name from Preferences
        if [ -f "$dir/Preferences" ]; then
            display_name=$(grep -o '"name":"[^"]*' "$dir/Preferences" | head -1 | cut -d'"' -f4)
            echo "  - $profile_name (Display name: ${display_name:-Unknown})"
        else
            echo "  - $profile_name"
        fi
    done
else
    echo "Chrome profiles directory not found!"
fi

echo ""
echo "To use a specific profile:"
echo "1. Note the profile directory name (e.g., 'Default', 'Profile 1', 'Profile 2')"
echo "2. Edit the launcher script at:"
echo "   /Volumes/Extreme SSD/Projects/bitcoin-email/Bitcoin Email Launcher.app/Contents/MacOS/launch"
echo "3. Change the CHROME_PROFILE_DIR variable to your profile directory name"
echo ""
echo "Or create a new Chrome profile:"
echo "1. Open Chrome"
echo "2. Click on your profile icon (top right)"
echo "3. Click 'Add' to create a new profile"
echo "4. Name it 'Bitcoin Email Dev' or similar"
echo "5. Run this script again to see the new profile directory"
echo ""