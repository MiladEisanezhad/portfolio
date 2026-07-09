# Milad Eisanezhad — Portfolio

My personal portfolio website, built to showcase my projects, share my thoughts through a blog, and give people an easy way to reach out to me.

I wanted a site that felt fully mine — not a template — so I built the frontend with Next.js, React, and TypeScript, and paired it with a Django backend to handle the blog content and contact form submissions.

🔗 **Live site:** [miladeisanezhad.pages.dev](https://miladeisanezhad.pages.dev/)

## What's inside

- **Projects showcase** — a gallery of things I've built, with descriptions and links
- **Blog** — a space where I write about what I'm learning and working on
- **Contact form** — lets visitors send me a message directly from the site
- **Responsive design** — looks good on desktop, tablet, and mobile

## Tech stack

**Frontend**
- Next.js
- React
- TypeScript
- CSS

**Backend**
- Django
- Python

## Deployment

This project runs on a split hosting setup:

- **Frontend → Cloudflare Pages**
  The Next.js app is deployed on Cloudflare Pages, connected directly to this repo. Every push to the main branch triggers a new build and deploy automatically, and it's served through Cloudflare's global CDN — so it loads fast wherever you are.

- **Backend → PythonAnywhere**
  The Django backend (API, blog data, contact form handling) is hosted on PythonAnywhere. It runs the Django app and exposes the API endpoints that the frontend calls for blog posts, projects, and form submissions.

Because the frontend and backend live on different hosts, the frontend talks to the backend over its public API URL rather than a local network call — so an environment variable (something like `NEXT_PUBLIC_API_URL`) is used to point the frontend at the correct backend address in production vs. local development.

## Project structure

```
portfolio/
├── frontend/     # Next.js + TypeScript app
├── backend/      # Django API
└── README.md
```

## Getting started

### Prerequisites

- Node.js (v18 or higher recommended)
- Python 3.10+
- npm or yarn
- pip

### Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000` by default.

### Backend setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # on Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The Django backend will run on `http://localhost:8000` by default.

### Environment variables

**Frontend (`frontend/.env.local`)**
```
NEXT_PUBLIC_API_URL=http://localhost:8000   # or your PythonAnywhere URL in production
```

**Backend (`backend/.env`)**
```
SECRET_KEY=your-django-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,yourusername.pythonanywhere.com
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://miladeisanezhad.pages.dev
EMAIL_HOST=smtp.example.com   # for the contact form
EMAIL_HOST_USER=your-email@example.com
EMAIL_HOST_PASSWORD=your-email-password
```

Adjust these to match your actual settings — check `.env.example` if one exists in the repo.

## Roadmap / things I might add

- [ ] Dark mode toggle
- [ ] Project filtering by tech stack
- [ ] Blog comments
- [ ] Analytics dashboard

## Feedback

If you spot a bug, have a suggestion, or just want to say hi, feel free to open an issue or reach out through the contact form on the site.
