# AI Job Finder - Simple Job Portal

A simple, no-registration job portal that matches job listings to your skills using AI. No login or signup required!

---

## 🔍 Features

✨ **Easy Access** - Start searching immediately without registration  
🤖 **AI-Powered Matching** - Semantic skill matching for accurate results  
🎯 **Skill Gap Analysis** - Identify skills you need to learn for each job  
🌍 **Global Jobs** - Browse remote and location-specific opportunities  
📋 **Simple Form** - Fill out your qualifications to find matching jobs  

---

## 🏗️ Project Structure

```
job_finder/
├── backend/
│   ├── main.py                 # FastAPI application entry point
│   ├── jobs.py                 # Job search endpoint (no auth required)
│   ├── ai_engine.py            # Skill extraction & semantic matching
│   ├── requirements.txt        # Python dependencies
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main app component (simplified routes)
│   │   ├── components/
│   │   │   ├── Navbar.jsx     # Simplified navigation
│   │   │   └── JobCard.jsx    # Job card with match score
│   │   └── pages/
│   │       ├── Dashboard.jsx  # Home - Job search form
│   │       └── JobResults.jsx # Results page
│   ├── package.json
│   └── ...
└── README.md
```

---

## 📋 Prerequisites

- **Node.js** 16+ and npm
- **Python** 3.10+
- **spaCy** and **sentence-transformers** (installed via requirements.txt)

---

## 🚀 Quick Start

### Backend Setup

1. Create virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

2. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

3. Download spaCy model:
```bash
python -m spacy download en_core_web_sm
```

4. Run the backend:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be running at `http://localhost:8000`

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Create `.env.local` (optional):
```
VITE_API_URL=http://localhost:8000
```

3. Run the development server:
```bash
npm run dev
```

Frontend will be running at `http://localhost:5173`

---

## 💻 How to Use

1. **Home Page (Dashboard)**
   - Enter your education level, years of experience
   - List your relevant skills (comma-separated)
   - Select your preferred country
   - Click "Find Jobs"

2. **Results Page**
   - See all matching jobs with match percentage
   - View skills you need to learn for each position
   - Click "View Job" to open the job listing
   - Click "New Search" to go back and search again

---

## 🔑 API Endpoints

### Job Search (No Authentication Required)
```
POST /api/jobs
Content-Type: application/json

{
  "skills": ["Python", "React", "Machine Learning"],
  "country": "Pakistan",
  "keywords": ["AI", "Backend"],
  "degree": "BS Computer Science",
  "experience": 2
}
```

**Response:**
```json
{
  "jobs": [
    {
      "title": "Senior Python Developer",
      "company": "TechCorp",
      "location": "Worldwide",
      "url": "https://...",
      "missing_skills": ["Kubernetes", "Docker"],
      "score": 0.87
    }
  ],
  "total": 25
}
```

---

## 🛠️ Technologies Used

### Backend
- **FastAPI** - Modern Python web framework
- **spaCy** - NLP for skill extraction
- **sentence-transformers** - Semantic text matching
- **requests** - HTTP client for job APIs
- **Pydantic** - Data validation
- **uvicorn** - ASGI server

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router v7** - Client-side routing
- **Tailwind CSS** - Styling

### External APIs
- **Remotive API** - Remote job listings source

---

## 📝 What Changed

This version has been completely rewritten to remove all authentication:

- ✅ Removed signup and login pages
- ✅ Removed authentication routes from backend
- ✅ Removed MongoDB database dependency for users
- ✅ Removed protected routes
- ✅ Removed LinkedIn OAuth integration
- ✅ No user profiles or data storage
- ✅ Direct job search without registration
- ✅ All data is session-based (temporary, not persisted)

---

## 🤝 Contributing

Feel free to fork and customize this project for your needs!

---

## 📄 License

Open source
