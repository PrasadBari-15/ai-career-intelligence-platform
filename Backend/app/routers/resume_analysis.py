from app.services.ai_service import analyze_resume_with_ai
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.resume import Resume
from app.models.resume_analysis import ResumeAnalysis
from app.security import get_current_user_id


router = APIRouter(
    prefix="/resume-analysis",
    tags=["Resume Analysis"]
)


@router.post("/{resume_id}")
def analyze_resume(
    resume_id: int,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):

    # Find the resume
    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == user_id
    ).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    if not resume.resume_text:
        raise HTTPException(
            status_code=400,
            detail="Resume text is empty"
        )

    # Analyze resume using AI
    analysis_text = analyze_resume_with_ai(
        resume.resume_text
    )

    # Save analysis
    analysis = ResumeAnalysis(
        resume_id=resume.id,
        analysis_text=analysis_text
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return {
        "message": "Resume analyzed successfully",
        "analysis_id": analysis.id,
        "resume_id": resume.id,
        "analysis": analysis.analysis_text
    }