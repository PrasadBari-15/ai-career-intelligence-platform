import { useState } from "react";

function CareerRoadmap() {
  const [match] = useState(() => {
    const savedMatch = localStorage.getItem("job_match_result");

    if (!savedMatch) {
      return null;
    }

    return JSON.parse(savedMatch);
  });

  const missingSkills = match?.missing_skills || [];

  const hasSkill = (skill) =>
    missingSkills.some(
      (item) => item.toLowerCase() === skill.toLowerCase()
    );

  const roadmap = [
    {
      number: "01",
      title: "Python Backend Foundations",
      description:
        "Strengthen the core backend skills required for Python development.",
      skills: ["Python", "SQL", "Git"],
      status: "Foundation",
    },
    {
      number: "02",
      title: "FastAPI & REST APIs",
      description:
        "Learn how to build production-ready APIs and backend services.",
      skills: ["FastAPI", "REST API"],
      status:
        hasSkill("FastAPI") || hasSkill("REST API")
          ? "Priority"
          : "Recommended",
    },
    {
      number: "03",
      title: "Containerization",
      description:
        "Learn how to package and run applications using containers.",
      skills: ["Docker"],
      status: hasSkill("Docker") ? "Priority" : "Recommended",
    },
    {
      number: "04",
      title: "Cloud Deployment",
      description:
        "Understand cloud services and deploy backend applications.",
      skills: ["AWS"],
      status: hasSkill("AWS") ? "Priority" : "Recommended",
    },
    {
      number: "05",
      title: "Build a Portfolio Project",
      description:
        "Combine your skills into a practical project that demonstrates your ability.",
      skills: ["Project", "Deployment"],
      status: "Final Step",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 75% 5%, rgba(99,72,255,.16), transparent 30%), #070b14",
        color: "#ffffff",
        padding: "35px",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1050px",
          margin: "0 auto",
        }}
      >
       

        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <div
            style={{
              color: "#9b88ff",
              fontSize: "12px",
              fontWeight: "800",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            Career Intelligence
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "42px",
              lineHeight: "1.1",
              fontWeight: "850",
              letterSpacing: "-1.5px",
              color: "#ffffff",
            }}
          >
            Career{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg,#9b7cff,#e66cff,#4fa9ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              Roadmap
            </span>
          </h1>

          <p
            style={{
              color: "#a5aec1",
              fontSize: "15px",
              lineHeight: "1.6",
              maxWidth: "680px",
              marginTop: "12px",
            }}
          >
            A personalized step-by-step path based on the skills required for
            your target role.
          </p>
        </div>

        {/* Target Role */}
        <div
          style={{
            padding: "20px 22px",
            marginBottom: "20px",
            borderRadius: "17px",
            background:
              "linear-gradient(145deg,rgba(25,20,60,.95),rgba(10,16,30,.96))",
            border: "1px solid rgba(141,124,255,.35)",
            boxShadow: "0 15px 40px rgba(0,0,0,.2)",
          }}
        >
          <div
            style={{
              color: "#8f82ff",
              fontSize: "11px",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Target Role
          </div>

          <div
            style={{
              color: "#ffffff",
              fontSize: "22px",
              fontWeight: "800",
              marginTop: "5px",
            }}
          >
            Junior Python Developer
          </div>

          {missingSkills.length > 0 && (
            <div
              style={{
                color: "#9ca7bc",
                fontSize: "12px",
                marginTop: "8px",
              }}
            >
              Your roadmap prioritizes {missingSkills.length} missing skills
              from your latest job match.
            </div>
          )}
        </div>

        {/* Roadmap */}
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "25px",
              top: "25px",
              bottom: "25px",
              width: "2px",
              background:
                "linear-gradient(180deg,#7657ff,#e45cff,#42b9ff)",
              opacity: 0.55,
            }}
          />

          <div
            style={{
              display: "grid",
              gap: "16px",
            }}
          >
            {roadmap.map((step) => (
              <div
                key={step.number}
                style={{
                  position: "relative",
                  display: "flex",
                  gap: "20px",
                }}
              >
                {/* Number */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    width: "52px",
                    height: "52px",
                    flexShrink: 0,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    background:
                      "linear-gradient(135deg,#7256ff,#c94fff)",
                    border: "4px solid #070b14",
                    boxShadow: "0 0 25px rgba(125,85,255,.35)",
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: "850",
                  }}
                >
                  {step.number}
                </div>

                {/* Content */}
                <div
                  style={{
                    flex: 1,
                    padding: "20px",
                    borderRadius: "17px",
                    background:
                      "linear-gradient(145deg,rgba(17,27,48,.95),rgba(10,16,29,.96))",
                    border: "1px solid rgba(255,255,255,.08)",
                    boxShadow: "0 12px 30px rgba(0,0,0,.2)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "15px",
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          margin: 0,
                          color: "#ffffff",
                          fontSize: "18px",
                          fontWeight: "800",
                        }}
                      >
                        {step.title}
                      </h2>

                      <p
                        style={{
                          margin: "7px 0 0",
                          color: "#9ca7bc",
                          fontSize: "12px",
                          lineHeight: "1.6",
                        }}
                      >
                        {step.description}
                      </p>
                    </div>

                    <span
                      style={{
                        padding: "7px 11px",
                        borderRadius: "20px",
                        background:
                          step.status === "Priority"
                            ? "rgba(255,151,72,.12)"
                            : "rgba(141,124,255,.12)",
                        border:
                          step.status === "Priority"
                            ? "1px solid rgba(255,151,72,.3)"
                            : "1px solid rgba(141,124,255,.25)",
                        color:
                          step.status === "Priority"
                            ? "#ffad70"
                            : "#b8aaff",
                        fontSize: "10px",
                        fontWeight: "750",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {step.status}
                    </span>
                  </div>

                  {/* Skills */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "7px",
                      marginTop: "15px",
                    }}
                  >
                    {step.skills.map((skill) => {
                      const priority = hasSkill(skill);

                      return (
                        <span
                          key={skill}
                          style={{
                            padding: "6px 9px",
                            borderRadius: "8px",
                            background: priority
                              ? "rgba(255,151,72,.10)"
                              : "rgba(255,255,255,.05)",
                            border: priority
                              ? "1px solid rgba(255,151,72,.25)"
                              : "1px solid rgba(255,255,255,.07)",
                            color: priority ? "#ffb078" : "#aab4c7",
                            fontSize: "10px",
                            fontWeight: "650",
                          }}
                        >
                          {priority ? "→ " : ""}
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div
          style={{
            marginTop: "22px",
            padding: "25px",
            borderRadius: "18px",
            textAlign: "center",
            background:
              "linear-gradient(135deg,rgba(110,80,255,.18),rgba(52,162,255,.08))",
            border: "1px solid rgba(125,100,255,.3)",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#ffffff",
              fontSize: "20px",
            }}
          >
            Ready to close your skill gaps?
          </h2>

          <p
            style={{
              color: "#929db2",
              fontSize: "12px",
              margin: "8px 0 0",
            }}
          >
            Follow the roadmap, build projects, and continuously improve your
            job compatibility.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CareerRoadmap;