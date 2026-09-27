from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.resume import Resume
from app.models.job_description import JobDescription
from app.security import get_current_user_id
from app.services.job_match_service import match_resume_with_job
from app.models.job_match import JobMatch

router = APIRouter(
    prefix="/job-match",
    tags=["Job Matching"]
)


@router.post("/{resume_id}/{job_id}")
def match_resume_to_job(
    resume_id: int,
    job_id: int,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):

    # Find user's resume
    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == user_id
    ).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    # Find user's job description
    job = db.query(JobDescription).filter(
        JobDescription.id == job_id,
        JobDescription.user_id == user_id
    ).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job description not found"
        )

    if not resume.resume_text:
        raise HTTPException(
            status_code=400,
            detail="Resume text is empty"
        )

    # Match resume with job
    result = match_resume_with_job(
        resume.resume_text,
        job.description
    )
    
    # Save match result
    job_match = JobMatch(
        user_id=user_id,
        resume_id=resume_id,
        job_id=job_id,
        match_score=result["match_score"],
        matching_skills=", ".join(
            result["matching_skills"]
        ),
        missing_skills=", ".join(
            result["missing_skills"]
        )
    )

    db.add(job_match)
    db.commit()
    db.refresh(job_match)

    return {
        "message": "Resume matched with job successfully",
        "match_id": job_match.id,
        "resume_id": resume_id,
        "job_id": job_id,
        "job_title": job.title,
        "match_score": result["match_score"],
        "matching_skills": result["matching_skills"],
        "missing_skills": result["missing_skills"]
    }
    