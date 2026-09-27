from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from pathlib import Path
from pypdf import PdfReader

from app.database import get_db
from app.models.resume import Resume
from app.security import get_current_user_id


router = APIRouter(
    prefix="/resumes",
    tags=["Resumes"]
)


UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/upload")
def upload_resume(
    file: UploadFile = File(...),
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    # Save uploaded file
    file_path = UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    # Extract text from PDF
    reader = PdfReader(str(file_path))

    resume_text = ""

    for page in reader.pages:
        text = page.extract_text()

        if text:
            resume_text += text + "\n"

    # Create database record
    new_resume = Resume(
        user_id=user_id,
        file_name=file.filename,
        file_path=str(file_path),
        resume_text=resume_text
    )

    db.add(new_resume)
    db.commit()
    db.refresh(new_resume)

    return {
        "message": "Resume uploaded and processed successfully",
        "resume_id": new_resume.id,
        "file_name": new_resume.file_name,
        "user_id": new_resume.user_id,
        "text_length": len(resume_text)
    }
    
@router.get("/my-resume")
def get_my_resume(
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    resume = db.query(Resume).filter(
        Resume.user_id == user_id
    ).order_by(
        Resume.id.desc()
    ).first()

    if not resume:
        return {
            "message": "No resume found"
        }

    return {
        "resume_id": resume.id,
        "file_name": resume.file_name,
        "file_path": resume.file_path,
        "resume_text": resume.resume_text,
        "uploaded_at": resume.uploaded_at
    }