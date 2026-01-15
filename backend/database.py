from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import os
from dotenv import load_dotenv
import certifi

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise ValueError("MONGO_URI environment variable is not set")

# Use certifi for SSL certificate validation
client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())

try:
    # Test connection
    client.admin.command('ping')
    print("✅ MongoDB connection successful")
except ConnectionFailure as e:
    print(f"❌ MongoDB connection failed: {e}")
    raise

db = client["ai_job_finder"]
users = db["users"]
jobs_cache = db["jobs_cache"]  # For caching job listings
user_sessions = db["sessions"]  # For session management