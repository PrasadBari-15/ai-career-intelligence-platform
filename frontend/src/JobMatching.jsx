import { useState } from "react";
import api from "./api";

function JobMatching() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleMatch = async () => {
    if (!title.trim() || !description.trim()) {
      setError("Please enter both job title and job description.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const token = localStorage.getItem("access_token");

      const resumeResponse = await api.get("/resumes/my-resume", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resumeId = resumeResponse.data.resume_id;

      if (!resumeId) {
        setError("Please upload a resume first.");
        return;
      }

      const jobResponse = await api.post(
        "/job-descriptions/",
        null,
        {
          params: {
            title,
            description,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const jobId = jobResponse.data.job_id;

      const matchResponse = await api.post(
        `/job-match/${resumeId}/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(matchResponse.data);

      localStorage.setItem(
        "job_match_result",
        JSON.stringify(matchResponse.data)
      );
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Job matching failed."
      );
    } finally {
      setLoading(false);
    }
  };

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
        {/* HEADER */}
        <div style={{ marginBottom: "28px" }}>
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
            Job Intelligence
          </div>

          {/* FULL GRADIENT HEADING */}
          <h1
            style={{
              margin: 0,
              fontSize: "42px",
              lineHeight: "1.1",
              fontWeight: "850",
              letterSpacing: "-1.5px",

              background:
                "linear-gradient(90deg, #8d7cff 0%, #c36cff 35%, #e66cff 55%, #4fa9ff 100%)",

              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",

              display: "inline-block",
            }}
          >
            Match Your Resume With a Job
          </h1>

          <p
            style={{
              color: "#9ca7bc",
              fontSize: "14px",
              lineHeight: "1.7",
              maxWidth: "700px",
              marginTop: "12px",
            }}
          >
            Paste a job description and CareerIQ will compare it with
            your resume to identify matching skills, missing skills and
            your overall compatibility.
          </p>
        </div>

        {/* INPUT CARD */}
        <div
          style={{
            padding: "26px",
            borderRadius: "20px",
            background:
              "linear-gradient(145deg,rgba(17,27,48,.96),rgba(9,15,28,.98))",
            border: "1px solid rgba(255,255,255,.09)",
            boxShadow: "0 18px 45px rgba(0,0,0,.25)",
          }}
        >
          {/* JOB TITLE */}
          <label
            style={{
              display: "block",
              color: "#b7c0d1",
              fontSize: "12px",
              fontWeight: "700",
              marginBottom: "8px",
            }}
          >
            Job Title
          </label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Junior Python Developer"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,.09)",
              background: "#0b111d",
              color: "#ffffff",
              outline: "none",
              fontSize: "13px",
              marginBottom: "20px",
            }}
          />

          {/* JOB DESCRIPTION */}
          <label
            style={{
              display: "block",
              color: "#b7c0d1",
              fontSize: "12px",
              fontWeight: "700",
              marginBottom: "8px",
            }}
          >
            Job Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Paste the complete job description here..."
            rows={10}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,.09)",
              background: "#0b111d",
              color: "#ffffff",
              outline: "none",
              resize: "vertical",
              fontSize: "13px",
              lineHeight: "1.6",
              marginBottom: "18px",
              fontFamily: "inherit",
            }}
          />

          {/* ERROR */}
          {error && (
            <div
              style={{
                marginBottom: "16px",
                padding: "13px",
                borderRadius: "11px",
                background: "rgba(255,70,90,.08)",
                border: "1px solid rgba(255,70,90,.2)",
                color: "#ff9ca7",
                fontSize: "12px",
              }}
            >
              {error}
            </div>
          )}

          {/* ANALYZE BUTTON */}
          <button
            onClick={handleMatch}
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              border: "0",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg,#7657ff,#b84cff)",
              color: "#ffffff",
              fontWeight: "800",
              fontSize: "13px",
              cursor: loading ? "wait" : "pointer",
              opacity: loading ? 0.65 : 1,
              boxShadow:
                "0 10px 30px rgba(112,80,255,.25)",
            }}
          >
            {loading
              ? "Analyzing Job Match..."
              : "Analyze Job Match →"}
          </button>
        </div>

        {/* RESULTS */}
        {result && (
          <div
            style={{
              marginTop: "22px",
              display: "grid",
              gap: "16px",
            }}
          >
            {/* SCORE CARD */}
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                padding: "32px",
                borderRadius: "20px",
                textAlign: "center",
                background:
                  "radial-gradient(circle at 50% 0%,rgba(121,88,255,.25),transparent 55%), linear-gradient(145deg,rgba(22,20,55,.98),rgba(10,16,30,.98))",
                border: "1px solid rgba(126,100,255,.38)",
                boxShadow:
                  "0 20px 50px rgba(70,50,180,.16)",
              }}
            >
              <div
                style={{
                  color: "#a999ff",
                  fontSize: "11px",
                  fontWeight: "800",
                  letterSpacing: "1.3px",
                  marginBottom: "8px",
                }}
              >
                JOB MATCH SCORE
              </div>

              <div
                style={{
                  fontSize: "64px",
                  fontWeight: "900",
                  lineHeight: "1.1",
                  background:
                    "linear-gradient(90deg,#9b7cff,#e66cff,#4fa9ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                {result.match_score}%
              </div>

              <div
                style={{
                  color: "#8994aa",
                  fontSize: "12px",
                  marginTop: "6px",
                }}
              >
                Resume compatibility
              </div>
            </div>

            {/* SKILL CARDS */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(280px,1fr))",
                gap: "16px",
              }}
            >
              {/* MATCHING SKILLS */}
              <div
                style={{
                  padding: "22px",
                  borderRadius: "18px",
                  background:
                    "linear-gradient(145deg,rgba(10,39,34,.9),rgba(9,20,25,.96))",
                  border:
                    "1px solid rgba(65,210,165,.25)",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 16px",
                    color: "#5fe0b2",
                    fontSize: "14px",
                  }}
                >
                  ✓ Matching Skills
                </h3>

                {result.matching_skills?.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    {result.matching_skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          padding: "7px 11px",
                          borderRadius: "9px",
                          background:
                            "rgba(65,210,165,.10)",
                          border:
                            "1px solid rgba(65,210,165,.18)",
                          color: "#78e6bd",
                          fontSize: "11px",
                          fontWeight: "650",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p
                    style={{
                      color: "#727e94",
                      fontSize: "12px",
                    }}
                  >
                    No matching skills detected.
                  </p>
                )}
              </div>

              {/* MISSING SKILLS */}
              <div
                style={{
                  padding: "22px",
                  borderRadius: "18px",
                  background:
                    "linear-gradient(145deg,rgba(48,31,15,.9),rgba(25,18,14,.96))",
                  border:
                    "1px solid rgba(255,170,70,.25)",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 16px",
                    color: "#ffb45f",
                    fontSize: "14px",
                  }}
                >
                  ! Missing Skills
                </h3>

                {result.missing_skills?.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    {result.missing_skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          padding: "7px 11px",
                          borderRadius: "9px",
                          background:
                            "rgba(255,170,70,.10)",
                          border:
                            "1px solid rgba(255,170,70,.18)",
                          color: "#ffc17c",
                          fontSize: "11px",
                          fontWeight: "650",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p
                    style={{
                      color: "#727e94",
                      fontSize: "12px",
                    }}
                  >
                    No missing skills detected.
                  </p>
                )}
              </div>
            </div>

            {/* CAREERIQ INSIGHT */}
            <div
              style={{
                padding: "20px",
                borderRadius: "17px",
                background:
                  "linear-gradient(135deg,rgba(110,80,255,.12),rgba(60,170,255,.05))",
                border:
                  "1px solid rgba(126,100,255,.20)",
              }}
            >
              <div
                style={{
                  color: "#a99cff",
                  fontSize: "11px",
                  fontWeight: "800",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: "7px",
                }}
              >
                CareerIQ Insight
              </div>

              <div
                style={{
                  color: "#d7dceb",
                  fontSize: "13px",
                  lineHeight: "1.6",
                }}
              >
                Your resume currently matches{" "}
                <strong style={{ color: "#ffffff" }}>
                  {result.match_score}%
                </strong>{" "}
                of the detected job requirements. Review the missing
                skills to improve your compatibility.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobMatching;