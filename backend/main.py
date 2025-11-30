from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth import router as auth_router
from jobs import router as jobs_router
from linkedin_oauth import router as linkedin_router


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router, prefix='/auth')
app.include_router(jobs_router, prefix='/api')
app.include_router(linkedin_router, prefix='/auth')


@app.get('/')
def root():
    return {"message": "AI Job Finder Backend running"}