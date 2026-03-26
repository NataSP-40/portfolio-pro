#!/bin/bash

# Diagnostic Script for Portfolio Pro Contact Component
# Run this from the backend directory to verify everything is set up correctly

echo "🔍 Portfolio Pro - Contact Component Diagnostic"
echo "================================================"
echo ""

# Check 1: Django Server Running
echo "1️⃣  Checking if Django server is running..."
if curl -s http://localhost:8000/api/contact-info/ > /dev/null 2>&1; then
    echo "✅ Django server is running on port 8000"
else
    echo "❌ Django server is NOT running on port 8000"
    echo "   Start it with: python manage.py runserver"
    exit 1
fi
echo ""

# Check 2: API Response
echo "2️⃣  Checking API response from contact-info endpoint..."
API_RESPONSE=$(curl -s http://localhost:8000/api/contact-info/)
echo "Response:"
echo "$API_RESPONSE" | python -m json.tool 2>/dev/null || echo "$API_RESPONSE"
echo ""

# Check 3: Django Models
echo "3️⃣  Checking ContactInfo model in database..."
python manage.py shell << 'EOF'
from projects.models import ContactInfo, Message
print("ContactInfo records:")
for contact in ContactInfo.objects.all():
    print(f"  - {contact} (Email: {contact.email})")
if not ContactInfo.objects.exists():
    print("  ⚠️  No ContactInfo records found!")
    
print("\nMessage records:")
count = Message.objects.count()
print(f"  Total: {count} message(s)")
EOF
echo ""

# Check 4: Port Status
echo "4️⃣  Port status:"
echo "   Django: ", $(lsof -i :8000 > /dev/null 2>&1 && echo "✅ Port 8000 in use" || echo "❌ Port 8000 is free")
echo "   Frontend: ", $(lsof -i :3000 > /dev/null 2>&1 && echo "✅ Port 3000 in use" || lsof -i :5173 > /dev/null 2>&1 && echo "✅ Port 5173 in use" || echo "❌ No frontend server detected")
echo ""

# Check 5: CORS Configuration
echo "5️⃣  Checking CORS configuration..."
python manage.py shell << 'EOF'
from django.conf import settings
print(f"CORS_ALLOW_ALL_ORIGINS: {settings.CORS_ALLOW_ALL_ORIGINS}")
if hasattr(settings, 'CORS_ALLOWED_ORIGINS'):
    print(f"CORS_ALLOWED_ORIGINS: {settings.CORS_ALLOWED_ORIGINS}")
EOF
echo ""

echo "✨ Diagnostic complete!"
echo ""
echo "📝 Next steps:"
echo "1. Open browser DevTools (F12)"
echo "2. Go to Console tab"
echo "3. Check for the logs mentioned in FETCH_DEBUGGING.md"
echo "4. Go to Network tab and filter by 'contact-info'"
echo "5. Check the response status and data"
