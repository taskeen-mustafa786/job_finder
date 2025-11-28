import os
import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
load_dotenv()

SECRET = os.getenv("SECRET_KEY", "devsecret")


def create_access_token(data: dict, expires_minutes: int = 60*24*7):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, SECRET, algorithm="HS256")
    return token


def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET, algorithms=["HS256"])
        return payload
    except Exception:
        return None