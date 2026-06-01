#!/bin/bash
# Move to the project directory
cd "$(dirname "$0")"

echo "============================================="
echo "Starting T&QLine Local Server..."
echo "Press Ctrl+C in this terminal window to stop."
echo "============================================="

# Open the site in the default browser
open "http://localhost:8000"

# Start the Python HTTP server
python3 -m http.server 8000
