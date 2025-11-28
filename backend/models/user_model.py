from pydantic import BaseModel, EmailStr
from typing import List, Optional

class User(BaseModel):
    email: EmailStr
    password_hash: str
    linkedin_token: Optional[str] = None
    skills: List[str] = []
    created_at: Optional[str] = None
    profile_status: Optional[str] = "incomplete"