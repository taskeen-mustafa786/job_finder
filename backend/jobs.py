from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests
from ai_engine import extract_skills_from_text, semantic_match_score

router = APIRouter()
REMOTIVE = "https://remotive.io/api/remote-jobs"


class JobSearchPayload(BaseModel):
    skills: list = []
    country: str = "Pakistan"
    keywords: list = []
    degree: str = ""
    experience: int = 0


@router.post('/jobs')
def get_jobs(payload: JobSearchPayload):
    """
    Search for jobs based on user skills and preferences.
    No authentication required.
    """
    try:
        skills = payload.skills
        country = payload.country
        keywords = [k.lower() for k in payload.keywords] if payload.keywords else []

        # fetch jobs from Remotive API
        r = requests.get(REMOTIVE, timeout=10)
        jobs = r.json().get('jobs', [])

        results = []

        for j in jobs:
            loc = j.get('candidate_required_location', '').lower()

            # Skip jobs not suitable for user's location
            if 'worldwide' not in loc and country.lower() not in loc:
                continue

            text = (j.get('title', '') + ' ' + j.get('description', '')).lower()

            # keyword filtering
            if keywords and not any(kw in text for kw in keywords):
                continue

            job_skills = extract_skills_from_text(text)

            missing = [s for s in job_skills if s not in [us.lower() for us in skills]]

            score = semantic_match_score(skills, text)

            results.append({
                'title': j.get('title'),
                'company': j.get('company_name'),
                'location': j.get('candidate_required_location'),
                'url': j.get('url'),
                'missing_skills': missing[:10],
                'score': score
            })

        # sort by score desc
        results = sorted(results, key=lambda x: x['score'], reverse=True)

        return {'jobs': results[:30], 'total': len(results)}
    
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Error fetching jobs: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")
