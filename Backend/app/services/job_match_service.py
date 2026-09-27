import re


def extract_skills(text: str):

    text = text.lower()

    skills = [
        "python",
        "sql",
        "mysql",
        "postgresql",
        "java",
        "c++",
        "javascript",
        "react",
        "fastapi",
        "flask",
        "pandas",
        "numpy",
        "power bi",
        "excel",
        "scikit-learn",
        "machine learning",
        "git",
        "github",
        "rest api",
        "docker",
        "aws",
        "azure",
        "gcp",
    ]

    return [
        skill
        for skill in skills
        if skill in text
    ]


def match_resume_with_job(resume_text: str, job_description: str):

    resume_skills = set(
        extract_skills(resume_text)
    )

    job_skills = set(
        extract_skills(job_description)
    )

    matching_skills = resume_skills.intersection(
        job_skills
    )

    missing_skills = job_skills - resume_skills

    if job_skills:
        match_score = round(
            (len(matching_skills) / len(job_skills)) * 100
        )
    else:
        match_score = 0

    return {
        "match_score": match_score,
        "matching_skills": sorted(matching_skills),
        "missing_skills": sorted(missing_skills),
        "resume_skills": sorted(resume_skills),
        "job_skills": sorted(job_skills)
    }