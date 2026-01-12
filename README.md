# job_finder

The AI-powered job finder that matches job listings to users' skills and qualifications.

---

## 🔍 Project Overview

**job_finder** helps users discover job opportunities tailored to their skills. It includes a FastAPI backend (with MongoDB) and a React + Vite frontend. The backend exposes authentication, job search, and LinkedIn OAuth endpoints; the frontend provides the UI for signup, login, and browsing results.

---

## ⚙️ Architecture

- **Backend:** FastAPI, MongoDB (pymongo), bcrypt for password hashing, uvicorn for running the app.
- **Frontend:** React + Vite, Tailwind CSS for styles.

---

## 📋 Prerequisites

- Node.js (16+), npm
- Python 3.10+
- MongoDB instance or Atlas cluster
- (Optional) ngrok or similar if you need public callbacks for OAuth during development

---

## 🔧 Setup

### Backend

1. Create and activate a Python virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate
```

2. Install dependencies:

```bash
pip install -r backend/requirements.txt
```

3. Copy and edit environment variables (create `backend/.env`):

```
MONGO_URI=your_mongo_uri
SECRET_KEY=replace_with_strong_secret
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
FRONTEND_URL=http://localhost:5173
```

4. Start the backend:

```bash
uvicorn backend.main:app --reload --port 8000
```

The backend will run at `http://localhost:8000`.

### Frontend

1. Install dependencies and run dev server:

```bash
cd frontend
npm install
```

2. Optionally create a Vite env file at `frontend/.env` with:

```
VITE_API_URL=http://localhost:8000
```

3. Start the frontend dev server:

```bash
npm run dev
```

The frontend will run at `http://localhost:5173` (Vite default).

---

## ▶️ How to test login/signup (quick)

- Signup (curl):

```bash
curl -X POST -d "email=test@example.com&password=secret" http://localhost:8000/auth/signup
```

- Login (curl):

```bash
curl -X POST -d "email=test@example.com&password=secret" http://localhost:8000/auth/login
```

Successful login returns JSON with `user_id` which the frontend stores in `localStorage`.

---

## 🧪 Tests & Troubleshooting

- If login fails, check browser DevTools (Network tab) for request URL and backend response; common issues:
  - Wrong API base URL in frontend (ensure `VITE_API_URL` or `http://localhost:8000` is used)
  - CORS blocked: backend uses permissive CORS in `backend/main.py` during development
  - Incorrect `MONGO_URI` or DB connectivity

- Check backend logs where `uvicorn` is running for tracebacks.

---

## 🚀 Deployment tips

- Build the frontend with `npm run build` and serve it with a static file host (Netlify, Vercel, or your own server).
- Set environment variables securely in your hosting provider (Mongo URI, secrets, LinkedIn keys).

---

## 🤝 Contributing

Contributions are welcome — open an issue or submit a pull request with a clear description and tests when applicable.

---

## 📄 License

MIT
