# Contact Component Debug Report

## ✅ Backend Status

### Database

- **ContactInfo Record**: ✅ Exists (pk=1)
- **Email**: nataliaspricop@gmail.com
- **Phone**: +1 (312) 619-1144
- **LinkedIn**: https://www.linkedin.com/in/natalia-pricop/

### API Endpoint Test

```bash
curl http://localhost:8000/api/contact-info/
```

**Response**:

```json
{
  "email": "nataliaspricop@gmail.com",
  "phone_number": "+1 (312) 619-1144",
  "linkedin_link": "https://www.linkedin.com/in/natalia-pricop/"
}
```

✅ **Working correctly**

---

## 📋 Frontend Component Updates

### What Changed:

1. **Added logging** to understand data flow:

   ```javascript
   console.log("Fetching contact info from API...");
   console.log("Contact info response:", response.data);
   ```

2. **Improved error handling** to see actual errors:

   ```javascript
   console.error(
     "Error fetching contact info:",
     error.response?.data || error.message,
   );
   ```

3. **Added fallback values** (empty string if null):
   ```javascript
   email: response.data.email || "";
   ```

### Two-Part UI Layout:

- **PART 1** (Top): Displays admin's email, phone, LinkedIn
- **PART 2** (Bottom): Contact form (3 input fields)

---

## 🔍 How to Debug in Browser

1. **Open browser DevTools** (F12 or Cmd+Option+I on Mac)
2. **Go to Console tab**
3. **Look for these logs**:

   ```
   ✅ Should see: "Fetching contact info from API..."
   ✅ Should see: "Contact info response:" with the data object
   ```

4. **If you see errors**, look for messages like:
   ```
   Error fetching contact info: ...
   ```

---

## 🚀 How to Test

### Step 1: Ensure Django is running

```bash
cd backend
python manage.py runserver
```

### Step 2: Ensure Frontend is running

```bash
cd frontend
npm run dev
```

### Step 3: Open the Contact component

Navigate to the page with the Contact component in your browser.

### Step 4: Check browser console

- **Console tab**: Look for fetch logs
- **Network tab**: Check if `http://localhost:8000/api/contact-info/` request returns 200 OK

---

## 📊 What You Should See

**Loading State** (first ~1 second):

```
Loading contact information...
```

**After Data Loads**:

```
Contact Information
Email: nataliaspricop@gmail.com
Phone: +1 (312) 619-1144
LinkedIn: View Profile

Send a Message
[Your Name input]
[Your Email input]
[Your Message textarea]
[Send Message button]
```

---

## ❌ Troubleshooting

### Issue: Still shows "Loading..."

→ Check browser console for fetch errors
→ Verify Django server is running on port 8000
→ Check Network tab to see if API request succeeds

### Issue: API returns 404

→ Verify URL is `http://localhost:8000/api/contact-info/`
→ Check that urls.py has the route defined
→ Restart Django server after code changes

### Issue: API returns 500 error

→ Check Django terminal for error messages
→ Verify ContactInfo model exists in database
→ Run: `python manage.py shell` to verify data

### Issue: CORS error

→ Verify CORS headers are set up in Django settings
→ Check that `django-cors-headers` is installed
→ Ensure `http://localhost:3000` (or 5173) is in `CORS_ALLOWED_ORIGINS`

---

## 📝 API Endpoints Available

| Method | Endpoint              | Purpose                     |
| ------ | --------------------- | --------------------------- |
| GET    | `/api/contact-info/`  | Fetch admin contact details |
| POST   | `/api/messages/`      | Submit user contact message |
| GET    | `/api/messages/list/` | List all messages (admin)   |

---

## ✨ Next Steps

1. Open the Contact page in your browser
2. Open DevTools Console (F12)
3. Check the logs to verify data is fetching
4. If working, you should see both sections displaying correctly

If you see errors, share the console error message and I'll help fix it!
