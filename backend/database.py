from pymongo import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://ai_job-ind:ai_job-ind@aijobfinder.hbyxbpf.mongodb.net/?appName=aijobfinder")
client = MongoClient(MONGO_URI)
db = client["ai_job_finder"]
users = db["users"]