import re


def analyze_resume_with_ai(resume_text: str):

    text = resume_text.lower()

    # --------------------------------
    # 1. Detect Technical Skills
    # --------------------------------

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
        "gcp"
    ]

    found_skills = []

    for skill in skills:
        if skill in text:
            found_skills.append(skill.title())

    # --------------------------------
    # 2. Detect Education
    # --------------------------------

    education = []

    if "computer science" in text:
        education.append("Computer Science")

    if "b.e." in text or "b.e" in text:
        education.append("B.E.")

    if "b.tech" in text:
        education.append("B.Tech")

    # --------------------------------
    # 3. Detect Experience
    # --------------------------------

    experience_keywords = [
        "experience",
        "software developer",
        "developer",
        "intern",
        "engineer"
    ]

    has_experience = any(
        keyword in text
        for keyword in experience_keywords
    )

    # --------------------------------
    # 4. Detect Projects
    # --------------------------------

    project_keywords = [
        "agroguide",
        "crop recommendation",
        "customer churn",
        "management system",
        "project"
    ]

    projects = []

    for project in project_keywords:
        if project in text:
            projects.append(project.title())

    # --------------------------------
    # 5. Detect Missing Skills
    # --------------------------------

    recommended_skills = []

    recommended_map = {
        "docker": "Docker",
        "aws": "AWS",
        "fastapi": "FastAPI",
        "power bi": "Power BI",
        "machine learning": "Machine Learning",
        "rest api": "REST APIs",
        "git": "Git"
    }

    for keyword, skill_name in recommended_map.items():

        if keyword not in text:
            recommended_skills.append(skill_name)

    # --------------------------------
    # 6. Calculate Resume Score
    # --------------------------------

    score = 0

    if found_skills:
        score += 30

    if has_experience:
        score += 20

    if projects:
        score += 20

    if education:
        score += 15

    if len(found_skills) >= 5:
        score += 15

    score = min(score, 100)

    # --------------------------------
    # 7. Career Recommendations
    # --------------------------------

    career_roles = [
        "Software Developer",
        "Python Developer",
        "Data Analyst",
        "Junior Data Engineer",
        "Backend Developer",
        "Machine Learning Intern"
    ]

    # --------------------------------
    # 8. Generate Analysis
    # --------------------------------

    analysis = f"""
RESUME INTELLIGENCE REPORT
==========================

PROFILE SCORE
-------------
{score}/100


1. TECHNICAL SKILLS
-------------------
Detected Skills:

{", ".join(found_skills) if found_skills else "No technical skills detected."}


2. EDUCATION
------------
{", ".join(education) if education else "Education information not detected."}


3. EXPERIENCE
-------------
{"Professional/developer experience detected." if has_experience else "No significant professional experience detected."}


4. PROJECTS
-----------
{", ".join(projects) if projects else "No projects detected."}


5. KEY STRENGTHS
----------------
- Technical skills are present.
- Practical project experience is demonstrated.
- The resume contains relevant technical information.
- The candidate demonstrates software/data-related experience.


6. SKILL GAPS
-------------
Recommended skills to strengthen:

{chr(10).join("- " + skill for skill in recommended_skills) if recommended_skills else "- Continue strengthening your existing technical skills."}


7. POTENTIAL CAREER ROLES
-------------------------
Based on the detected technical profile:

{chr(10).join("- " + role for role in career_roles)}


8. RECOMMENDED NEXT STEPS
-------------------------
- Strengthen Python programming.
- Practice SQL and database concepts.
- Build production-quality projects.
- Improve REST API development.
- Strengthen Git and GitHub usage.
- Learn cloud deployment.
- Practice technical interview questions.


9. OVERALL SUGGESTION
---------------------
The resume demonstrates a technical foundation and practical project
experience. Continue developing production-oriented projects and strengthen
the skills identified in the skill-gap section.
"""

    return analysis