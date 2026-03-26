#!/bin/bash

# Quick API Test
# Run this to verify the API works before checking React

echo "🧪 Quick API Test"
echo "================="
echo ""

echo "1. Testing direct curl request:"
echo "Command: curl http://localhost:8000/api/contact-info/"
echo "Response:"
curl -s http://localhost:8000/api/contact-info/ | python -m json.tool || echo "Error: Could not reach API"
echo ""

echo "2. Testing with verbose output:"
curl -i http://localhost:8000/api/contact-info/ 2>&1 | head -20
echo ""

echo "✅ If you see JSON data above, the API is working correctly."
echo "❌ If you see an error, the backend has an issue."
echo ""
echo "For React debugging:"
echo "1. Open browser to Contact component"
echo "2. Press F12 to open DevTools"
echo "3. Look in Console tab for 🔄 'Fetching contact info' logs"
echo "4. Check Network tab for 'contact-info' request"
