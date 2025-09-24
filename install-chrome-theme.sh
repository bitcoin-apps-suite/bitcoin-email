#!/bin/bash

echo "🎨 Installing Bitcoin Email Chrome Theme"
echo "========================================"
echo ""
echo "This will open Chrome so you can install the red theme."
echo ""
echo "Steps:"
echo "1. Chrome will open to the extensions page"
echo "2. Enable 'Developer mode' (top right toggle)"
echo "3. Click 'Load unpacked'"
echo "4. Select the chrome-theme folder when prompted"
echo ""
read -p "Press Enter to continue..."

# Open Chrome with the Bitcoin Email profile to extensions page
open -a "Google Chrome" --args \
    --profile-directory="Profile 22" \
    "chrome://extensions"

echo ""
echo "📂 When prompted, select this folder:"
echo "   /Volumes/Extreme SSD/Projects/bitcoin-email/chrome-theme"
echo ""
echo "The theme will apply automatically once loaded!"
echo ""
echo "To match exactly with VSCode:"
echo "- Title bar will be red (#ef4444)"
echo "- Interface will be dark like your VSCode"
echo ""