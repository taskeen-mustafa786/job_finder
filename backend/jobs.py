from fastapi import APIRouter
import requests
from ai_engine import extract_skills_from_text, semantic_match_score
from database import users

router = APIRouter()
REMOTIVE = "https://remotive.io/api/remote-jobs"


@router.post('/jobs')
def get_jobs(payload: dict):
    # payload: { skills: [], country: 'Pakistan', keywords: [] }
    skills = payload.get('skills', [])
    country = payload.get('country', 'Pakistan')
    keywords = [k.lower() for k in payload.get('keywords', [])]

    # fetch jobs
    r = requests.get(REMOTIVE)
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

    return {'jobs': results[:30]}
