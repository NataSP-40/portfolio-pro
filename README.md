# Portfolio Pro

A full-stack personal portfolio website with a React + Vite frontend and a Django REST backend.

## Description

Portfolio Pro is a modern, responsive developer portfolio that showcases profile details, project work, technical skills, and contact information through a clean single-page experience. The project is split into a React frontend and a Django REST backend, with support for cloud media storage and production-ready security settings.

## Live Link

Frontend: https://your-frontend-domain.vercel.app

Backend API: https://your-backend-domain.onrender.com/api

## Tech Stack

Frontend:

- React 19
- Vite 7
- Tailwind CSS 4
- Axios

Backend:

- Python 3 + Django 5
- Django REST Framework
- django-cors-headers
- Cloudinary (media storage)
- WhiteNoise (static file serving)
- Gunicorn
- SQLite (local) / PostgreSQL via DATABASE_URL (production)

## Setup and Installation

### Prerequisites

- Node.js (LTS)
- npm
- Python 3.x
- pip

### 1) Clone repository

```bash
git clone <your-repository-url>
cd portfolio-pro
```

### 2) Setup frontend

```bash
cd frontend
npm install
npm run dev
```

### 3) Setup backend

```bash
cd ../backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 4) Environment variables

Configure environment variables for production and local integration as needed, including:

- DJANGO_SECRET_KEY
- DATABASE_URL
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- DJANGO_CORS_ALLOWED_ORIGINS
- DJANGO_CSRF_TRUSTED_ORIGINS
- VITE_API_URL
- VITE_MEDIA_BASE_URL

## Features

- Responsive single-page portfolio layout for desktop and mobile.
- Sticky navbar with mobile navigation menu and section-based navigation.
- Dynamic profile and contact data loaded from backend APIs.
- Project and skills presentation components.
- Resume link support with API-driven fallback behavior.
- Media handling through Cloudinary integration.
- Production-oriented backend security settings (HTTPS, HSTS, secure cookies, frame/content protections).
- Static asset optimization and serving via Vite and WhiteNoise.

## Security and Performance

Current security/performance setup includes:

- Environment-variable based configuration for secret and deployment values.
- Production security headers and HTTPS settings (HSTS, secure cookies, clickjacking/content-type protections).
- Configurable CORS and CSRF trusted origins.
- Static file serving through WhiteNoise.
- Database connection reuse via connection pooling settings (conn_max_age).
