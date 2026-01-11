import os
import secrets
from typing import Optional, Dict, Any

import requests
from urllib.parse import urlencode

from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse


router = APIRouter(prefix="/linkedin", tags=["LinkedIn Auth"])


class LinkedInOAuth:
    """Handle LinkedIn OAuth 2.0 authentication flow"""

    def __init__(self):
        self.client_id = os.getenv("LINKEDIN_CLIENT_ID")
        self.client_secret = os.getenv("LINKEDIN_CLIENT_SECRET")
        self.redirect_uri = os.getenv(
            "LINKEDIN_REDIRECT_URI",
            "http://localhost:8000/auth/linkedin/callback"
        )

        if not self.client_id or not self.client_secret:
            raise RuntimeError("LinkedIn CLIENT_ID or CLIENT_SECRET missing")

        self.auth_url = "https://www.linkedin.com/oauth/v2/authorization"
        self.token_url = "https://www.linkedin.com/oauth/v2/accessToken"
        self.profile_url = "https://api.linkedin.com/v2/me"
        self.email_url = (
            "https://api.linkedin.com/v2/emailAddress"
            "?q=members&projection=(elements*(handle~))"
        )

    def get_authorization_url(self, state: str) -> str:
        params = {
            "response_type": "code",
            "client_id": self.client_id,
            "redirect_uri": self.redirect_uri,
            "state": state,
            "scope": "r_liteprofile r_emailaddress"
        }
        return f"{self.auth_url}?{urlencode(params)}"

    def get_access_token(self, code: str) -> Optional[Dict[str, Any]]:
        payload = {
            "grant_type": "authorization_code",
            "code": code,
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "redirect_uri": self.redirect_uri
        }

        try:
            response = requests.post(self.token_url, data=payload)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print("Token error:", e)
            return None

    def get_user_profile(self, access_token: str) -> Optional[Dict[str, Any]]:
        headers = {"Authorization": f"Bearer {access_token}"}

        try:
            response = requests.get(self.profile_url, headers=headers)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print("Profile error:", e)
            return None

    def get_user_email(self, access_token: str) -> Optional[str]:
        headers = {"Authorization": f"Bearer {access_token}"}

        try:
            response = requests.get(self.email_url, headers=headers)
            response.raise_for_status()
            data = response.json()

            elements = data.get("elements", [])
            if elements:
                return elements[0].get("handle~", {}).get("emailAddress")
            return None
        except requests.RequestException as e:
            print("Email error:", e)
            return None

    def authenticate_user(self, code: str) -> Optional[Dict[str, Any]]:
        token_data = self.get_access_token(code)
        if not token_data:
            return None

        access_token = token_data["access_token"]

        profile = self.get_user_profile(access_token)
        email = self.get_user_email(access_token)

        if profile:
            profile["email"] = email
            profile["access_token"] = access_token
            profile["expires_in"] = token_data.get("expires_in")

        return profile


linkedin_service = LinkedInOAuth()


# ============================
# 🚀 FASTAPI ROUTES
# ============================

@router.get("/login")
def linkedin_login():
    state = secrets.token_urlsafe(16)
    auth_url = linkedin_service.get_authorization_url(state)
    return RedirectResponse(auth_url)


@router.get("/callback")
def linkedin_callback(code: str):
    user = linkedin_service.authenticate_user(code)
    if not user:
        raise HTTPException(status_code=400, detail="LinkedIn authentication failed")
    return user
