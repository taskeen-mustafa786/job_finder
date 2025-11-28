from fastapi import APIRouter, Form, HTTPException
from database import users
import bcrypt
from datetime import datetime

router = APIRouter()

@router.post('/signup')
def signup(email: str = Form(...), password: str = Form(...)):
    if users.find_one({"email": email}):
        raise HTTPException(status_code=400, detail="Email already exists")
    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    users.insert_one({
        "email": email,
        "password": hashed,
        "linkedin_token": None,
        "skills": [],
        "created_at": datetime.utcnow(),
        "profile_status": "incomplete"
    })
    return {"message": "signup successful"}

@router.post('/login')
def login(email: str = Form(...), password: str = Form(...)):
    user = users.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not bcrypt.checkpw(password.encode(), user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "login successful", "user_id": str(user["_id"])}