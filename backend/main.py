from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from jobs import router as jobs_router


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(jobs_router, prefix='/api')


@app.get('/')
def root():
    return {"message": "AI Job Finder Backend running"}