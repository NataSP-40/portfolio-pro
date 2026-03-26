# React API Fetch Diagnostic Guide

## 🔍 What to Look For in Browser Console

After the Contact component loads, you should see these logs in order:

### ✅ Expected Console Logs

```
🎯 useEffect triggered - calling getContactInfo
🔄 Fetching contact info from API...
📍 API endpoint: http://localhost:8000/api/contact-info/
🌐 API Request: GET http://localhost:8000/api/contact-info/
✅ API Response: 200 http://localhost:8000/api/contact-info/
✅ Contact info response received: {data: {...}, status: 200, ...}
📦 Response data: {email: "...", phone_number: "...", linkedin_link: "..."}
📧 Email: nataliaspricop@gmail.com
📱 Phone: +1 (312) 619-1144
🔗 LinkedIn: https://www.linkedin.com/in/natalia-pricop/
✨ ContactInfo state updated
⏱️ Loading state set to false
```

---

## ❌ Troubleshooting - If You See Different Logs

### Issue 1: Logs Never Appear

**Problem**: `useEffect` is not running
**Solution**:

- Verify the Contact component is being imported and rendered
- Check if there are any JavaScript errors above these logs
- Try refreshing the page (Cmd+Shift+R to hard refresh)

---

### Issue 2: Request Log Appears But Response Doesn't

**Problem**: The API request is being sent, but no response comes back
**Log Pattern**:

```
🌐 API Request: GET http://localhost:8000/api/contact-info/
(then nothing... or timeout error)
```

**Solutions**:

- Verify Django server is running on port 8000
- Check if port 8000 is accessible: `curl http://localhost:8000/api/contact-info/`
- Check network tab in DevTools - does the request show under Network tab?
  - If not in Network tab, CORS might be blocking it (should see in console)
  - If in Network tab but fails, check the response status code

---

### Issue 3: CORS Error

**Problem**: Browser blocks the request (security policy)
**Log Pattern**:

```
🌐 API Request: GET http://localhost:8000/api/contact-info/
❌ API Error: No response http://localhost:8000/api/contact-info/
Error message: Network Error
```

**Solution**:

- This shouldn't happen since `CORS_ALLOW_ALL_ORIGINS = True` in Django
- Try restarting Django server: `python manage.py runserver`
- Check Django console for CORS-related errors

---

### Issue 4: 404 Error

**Log Pattern**:

```
❌ API Error: 404 http://localhost:8000/api/contact-info/
```

**Solution**:

- Verify URL route exists: Check `backend/projects/urls.py`
- Verify it says: `path('contact-info/', views.ContactInfoRetrieve.as_view())`
- Restart Django server after any URL changes

---

### Issue 5: 500 Error

**Log Pattern**:

```
❌ API Error: 500 http://localhost:8000/api/contact-info/
```

**Solution**:

- Check Django terminal for error stack trace
- Likely issue: ContactInfo model has no data
- Fix: Run this in Django shell:
  ```bash
  python manage.py shell
  from projects.models import ContactInfo
  ContactInfo.objects.first()  # Should return an object, not None
  ```

---

### Issue 6: Timeout Error

**Log Pattern**:

```
🌐 API Request: GET http://localhost:8000/api/contact-info/
(waits 10 seconds then...)
❌ API Error: timeout http://localhost:8000/api/contact-info/
```

**Solution**:

- Django server might be hung or slow
- Try accessing directly: `curl http://localhost:8000/api/contact-info/`
- If slow, restart Django: `python manage.py runserver`

---

## 🛠️ Debugging Steps

### Step 1: Verify Django is Running

```bash
# In terminal, run:
curl -s http://localhost:8000/api/contact-info/ | python -m json.tool
```

Should show:

```json
{
  "email": "nataliaspricop@gmail.com",
  "phone_number": "+1 (312) 619-1144",
  "linkedin_link": "https://www.linkedin.com/in/natalia-pricop/"
}
```

---

### Step 2: Open Browser DevTools

1. Press `F12` (or Cmd+Option+I on Mac)
2. Go to **Console** tab
3. Go to **Network** tab (open both side-by-side if possible)

---

### Step 3: Reload the Contact Page

1. Make sure Contact component is visible on the page
2. Press `Cmd+Shift+R` (hard refresh)
3. Watch the Console and Network tabs

---

### Step 4: Check Network Tab

In the **Network** tab, look for a request to:

- `contact-info/` or `http://localhost:8000/api/contact-info/`

Click on it to see:

- **Status**: Should be 200 (green)
- **Response**: Should show the JSON data
- **Headers**: Should show CORS headers

---

### Step 5: Check Console Tab

Scroll through the Console and look for the log messages above.
Take a screenshot of any error messages and share them.

---

## 📋 Information to Share If Still Not Working

When reporting the issue, provide:

1. **Console logs** (copy/paste all logs related to "Fetching" or "API")
2. **Network tab screenshot** showing the request to `contact-info/`
3. **Django terminal output** (any errors?)
4. **Frontend terminal output** (npm run dev output)
5. **Direct curl test result**:
   ```bash
   curl -s http://localhost:8000/api/contact-info/
   ```

---

## ✨ Success Checklist

- [ ] Console shows all the expected logs above
- [ ] Contact Information section is no longer showing "Loading..."
- [ ] Email, Phone, and LinkedIn are displayed
- [ ] No red error messages in Console
- [ ] Network tab shows 200 status for contact-info request
