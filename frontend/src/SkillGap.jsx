import { useState } from "react";

function SkillGap() {
  const [skills] = useState(() => {
    const savedMatch = localStorage.getItem("job_match_result");

    if (!savedMatch) {
      return [];
    }

    const match = JSON.parse(savedMatch);

    return (match.missing_skills || []).map((skill) => ({
      name: skill,
      level: "Beginner",
      progress: 0,
      description: `Build your knowledge of ${skill} to improve your job compatibility.`,
    }));
  });

  const skillStyles = {
    aws: {
      icon: "AWS",
      accent: "#ff9900",
      background: "rgba(255,153,0,.10)",
    },
    docker: {
      icon: "◈",
      accent: "#2496ed",
      background: "rgba(36,150,237,.10)",
    },
    fastapi: {
      icon: "ϟ",
      accent: "#00c7b7",
      background: "rgba(0,199,183,.10)",
    },
    "rest api": {
      icon: "⚙",
      accent: "#e85cff",
      background: "rgba(232,92,255,.10)",
    },
  };

  const getSkillStyle = (name) => {
    return (
      skillStyles[name.toLowerCase()] || {
        icon: "✦",
        accent: "#8d7cff",
        background: "rgba(141,124,255,.10)",
      }
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 75% 5%, rgba(99,72,255,.16), transparent 30%), #070b14",
        color: "#f7f8ff",
        padding: "35px",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          style={{
            padding: "10px 16px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,.10)",
            background: "rgba(255,255,255,.045)",
            color: "#dce1ef",
            cursor: "pointer",
            fontSize: "13px",
            marginBottom: "32px",
            transition: "all .2s ease",
          }}
        >
        </button>

        {/* Header */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "10px 0 28px",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: "20px",
              top: "-60px",
              width: "190px",
              height: "190px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(115,75,255,.28), transparent 65%)",
              filter: "blur(10px)",
              pointerEvents: "none",
            }}
          />

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
            Skill Gap{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg,#9b7cff,#e66cff,#4fa9ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              Analysis
            </span>
          </h1>

          <p
            style={{
              color: "#a5aec1",
              fontSize: "15px",
              lineHeight: "1.6",
              maxWidth: "650px",
              marginTop: "12px",
            }}
          >
            Identify missing skills and follow a personalized learning path
            to improve your job compatibility.
          </p>
        </div>

        {/* Summary cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0,1fr))",
            gap: "16px",
            marginBottom: "22px",
          }}
        >
          {/* Skills */}
          <div
            style={{
              padding: "20px",
              borderRadius: "16px",
              background:
                "linear-gradient(145deg, rgba(18,29,52,.96), rgba(10,16,30,.96))",
              border: "1px solid rgba(65,145,255,.35)",
              boxShadow: "0 12px 35px rgba(0,0,0,.22)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "13px",
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(66,145,255,.15)",
                  border: "1px solid rgba(66,145,255,.35)",
                  color: "#65b4ff",
                  fontSize: "21px",
                }}
              >
                ◉
              </div>

              <div>
                <div
                  style={{
                    color: "#9ca7bc",
                    fontSize: "12px",
                  }}
                >
                  Skills to Improve
                </div>

                <div
                  style={{
                    fontSize: "26px",
                    fontWeight: "850",
                    marginTop: "3px",
                    color: "#ffffff",
                  }}
                >
                  {skills.length}
                </div>
              </div>
            </div>
          </div>

          {/* Priority */}
          <div
            style={{
              padding: "20px",
              borderRadius: "16px",
              background:
                "linear-gradient(145deg, rgba(43,25,28,.96), rgba(17,14,22,.96))",
              border: "1px solid rgba(255,126,72,.38)",
              boxShadow: "0 12px 35px rgba(0,0,0,.22)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "13px",
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(255,126,72,.13)",
                  border: "1px solid rgba(255,126,72,.35)",
                  color: "#ff9a58",
                  fontSize: "21px",
                }}
              >
                !
              </div>

              <div>
                <div
                  style={{
                    color: "#9ca7bc",
                    fontSize: "12px",
                  }}
                >
                  Priority
                </div>

                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: "850",
                    marginTop: "3px",
                    color: "#ffffff",
                  }}
                >
                  {skills.length > 0 ? "High" : "Low"}
                </div>
              </div>
            </div>
          </div>

          {/* Focus */}
          <div
            style={{
              padding: "20px",
              borderRadius: "16px",
              background:
                "linear-gradient(145deg, rgba(13,39,44,.96), rgba(9,20,27,.96))",
              border: "1px solid rgba(0,206,190,.38)",
              boxShadow: "0 12px 35px rgba(0,0,0,.22)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "13px",
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(0,206,190,.13)",
                  border: "1px solid rgba(0,206,190,.35)",
                  color: "#4de0d0",
                  fontSize: "21px",
                }}
              >
                ◆
              </div>

              <div>
                <div
                  style={{
                    color: "#9ca7bc",
                    fontSize: "12px",
                  }}
                >
                  Learning Focus
                </div>

                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: "850",
                    marginTop: "3px",
                    color: "#ffffff",
                  }}
                >
                  Backend
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Empty state */}
        {skills.length === 0 && (
          <div
            style={{
              padding: "45px",
              textAlign: "center",
              borderRadius: "18px",
              background: "rgba(16,22,35,.85)",
              border: "1px solid rgba(255,255,255,.08)",
              color: "#aab3c6",
            }}
          >
            <div
              style={{
                fontSize: "35px",
                marginBottom: "12px",
              }}
            >
              ✦
            </div>

            <h2
              style={{
                margin: "0 0 8px",
                color: "#ffffff",
              }}
            >
              No skill gaps yet
            </h2>

            <p style={{ margin: 0 }}>
              Run Job Matching first to generate your personalized skill gaps.
            </p>
          </div>
        )}

        {/* Skill cards */}
        <div
          style={{
            display: "grid",
            gap: "14px",
          }}
        >
          {skills.map((skill) => {
            const visual = getSkillStyle(skill.name);

            return (
              <div
                key={skill.name}
                style={{
                  padding: "20px",
                  borderRadius: "17px",
                  background:
                    "linear-gradient(145deg, rgba(17,27,48,.95), rgba(10,16,29,.96))",
                  border: `1px solid ${visual.accent}55`,
                  boxShadow: "0 12px 30px rgba(0,0,0,.22)",
                  transition: "transform .2s ease, border-color .2s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: "68px",
                      height: "68px",
                      flexShrink: 0,
                      borderRadius: "15px",
                      display: "grid",
                      placeItems: "center",
                      background: visual.background,
                      border: `1px solid ${visual.accent}66`,
                      color: visual.accent,
                      fontWeight: "900",
                      fontSize:
                        skill.name.toLowerCase() === "aws" ? "17px" : "27px",
                      boxShadow: `0 0 25px ${visual.accent}18`,
                    }}
                  >
                    {visual.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "15px",
                      }}
                    >
                      <h2
                        style={{
                          margin: 0,
                          color: "#ffffff",
                          fontSize: "18px",
                          fontWeight: "800",
                        }}
                      >
                        {skill.name}
                      </h2>

                      <span
                        style={{
                          padding: "7px 13px",
                          borderRadius: "20px",
                          background: "rgba(118,82,255,.18)",
                          border: "1px solid rgba(141,124,255,.3)",
                          color: "#b6a9ff",
                          fontSize: "11px",
                          fontWeight: "750",
                        }}
                      >
                        {skill.level}
                      </span>
                    </div>

                    <p
                      style={{
                        color: "#9ca7bc",
                        fontSize: "12px",
                        margin: "5px 0 12px",
                      }}
                    >
                      {skill.description}
                    </p>

                    <div
                      style={{
                        height: "7px",
                        borderRadius: "10px",
                        background: "rgba(255,255,255,.08)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${skill.progress}%`,
                          height: "100%",
                          borderRadius: "10px",
                          background: `linear-gradient(90deg, ${visual.accent}, #8d7cff)`,
                          boxShadow: `0 0 12px ${visual.accent}55`,
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "7px",
                        color: "#6f7b91",
                        fontSize: "10px",
                      }}
                    >
                      <span>{skill.progress}% complete</span>
                      <span>{skill.progress}%</span>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      background: "rgba(255,255,255,.055)",
                      border: "1px solid rgba(255,255,255,.09)",
                      color: "#c6ccda",
                      fontSize: "20px",
                    }}
                  >
                    →
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Roadmap */}
        {skills.length > 0 && (
          <div
            style={{
              marginTop: "20px",
              padding: "24px",
              borderRadius: "18px",
              background:
                "linear-gradient(145deg, rgba(26,19,65,.95), rgba(10,16,31,.98))",
              border: "1px solid rgba(125,95,255,.45)",
              boxShadow: "0 18px 45px rgba(0,0,0,.25)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <div>
                <div
                  style={{
                    color: "#b59cff",
                    fontSize: "11px",
                    fontWeight: "800",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  Recommended Learning Path
                </div>

                <h2
                  style={{
                    margin: "5px 0 0",
                    color: "#ffffff",
                    fontSize: "21px",
                  }}
                >
                  Your next steps
                </h2>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#8994aa",
                    fontSize: "12px",
                  }}
                >
                  Follow this step-by-step path to build the missing skills.
                </p>
              </div>

              <span
                style={{
                  padding: "8px 13px",
                  borderRadius: "20px",
                  background: "rgba(141,124,255,.18)",
                  border: "1px solid rgba(141,124,255,.3)",
                  color: "#c2b8ff",
                  fontSize: "11px",
                  fontWeight: "700",
                }}
              >
                {Math.max(skills.length + 1, 5)} Steps
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(150px,1fr))",
                gap: "10px",
              }}
            >
              {[
                "Learn AWS Basics",
                "Learn Docker",
                "Learn FastAPI",
                "Learn API Development",
                "Build a Project",
              ].map((step, index) => (
                <div
                  key={step}
                  style={{
                    padding: "15px",
                    borderRadius: "13px",
                    background: "rgba(255,255,255,.045)",
                    border: "1px solid rgba(255,255,255,.07)",
                  }}
                >
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      background:
                        "linear-gradient(135deg,#6e55ff,#d74cff)",
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: "800",
                      marginBottom: "10px",
                    }}
                  >
                    {index + 1}
                  </div>

                  <div
                    style={{
                      color: "#f1f3fa",
                      fontWeight: "700",
                      fontSize: "11px",
                    }}
                  >
                    {step}
                  </div>

                  <div
                    style={{
                      color: "#737f96",
                      fontSize: "9px",
                      lineHeight: "1.5",
                      marginTop: "5px",
                    }}
                  >
                    Build practical knowledge and apply it through projects.
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SkillGap;