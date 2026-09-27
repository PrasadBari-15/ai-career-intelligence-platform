from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.job_description import JobDescription
from app.security import get_current_user_id


router = APIRouter(
    prefix="/job-descriptions",
    tags=["Job Descriptions"]
)


@router.post("/")
def create_job_description(
    title: str,
    description: str,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):

    new_job = JobDescription(
        user_id=user_id,
        title=title,
        description=description
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    return {
        "message": "Job description saved successfully",
        "job_id": new_job.id,
        "title": new_job.title
    }