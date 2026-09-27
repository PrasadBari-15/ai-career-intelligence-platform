from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models.user import User
from app.models.resume import Resume
from app.models.resume_analysis import ResumeAnalysis
from app.models.job_description import JobDescription
from app.models.job_match import JobMatch

from app.routers.auth import router as auth_router
from app.routers.resume import router as resume_router
from app.routers.resume_analysis import router as resume_analysis_router
from app.routers.job_description import router as job_description_router
from app.routers.job_match import router as job_match_router

# Create database tables
Base.metadata.create_all(bind=engine)


# Create FastAPI application
app = FastAPI(
    title="AI Career Intelligence Platform",
    description="AI-powered career management platform",
    version="1.0.0"
)

# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include authentication routes
app.include_router(auth_router)

# Include resume routes
app.include_router(resume_router)

# Include resume analysis routes
app.include_router(resume_analysis_router)

# Include job description routes
app.include_router(job_description_router)

# Include job matching routes
app.include_router(job_match_router)


@app.get("/")
def home():
    return {
        "message": "AI Career Intelligence Platform API",
        "status": "running"
    }