import { useState } from "react";
import api from "./api";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF resume.");
      return;
    }

    setUploading(true);
    setError("");
    setResult(null);
    setAnalysis(null);

    try {
      const token = localStorage.getItem("access_token");

      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post(
        "/resumes/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(response.data);
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Resume upload failed."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!result?.resume_id) return;

    setAnalyzing(true);
    setError("");
    setAnalysis(null);

    try {
      const token = localStorage.getItem("access_token");

      const response = await api.post(
        `/resume-analysis/${result.resume_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalysis(response.data.analysis);
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Resume analysis failed."
      );
    } finally {
      setAnalyzing(false);
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
            Resume Intelligence
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "42px",
              lineHeight: "1.1",
              fontWeight: "850",
              letterSpacing: "-1.5px",
              background:
                "linear-gradient(90deg,#8d7cff 0%,#c36cff 35%,#e66cff 55%,#4fa9ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            Upload Your Resume
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
            Upload your PDF resume and let CareerIQ extract your
            professional information and generate a career intelligence
            report.
          </p>
        </div>

        {/* UPLOAD CARD */}
        <div
          style={{
            padding: "30px",
            borderRadius: "20px",
            background:
              "linear-gradient(145deg,rgba(17,27,48,.96),rgba(9,15,28,.98))",
            border: "1px solid rgba(255,255,255,.09)",
            boxShadow: "0 18px 45px rgba(0,0,0,.25)",
          }}
        >
          {/* DROP AREA */}
          <div
            style={{
              minHeight: "300px",
              borderRadius: "18px",
              border:
                "1px dashed rgba(141,124,255,.55)",
              background:
                "radial-gradient(circle at 50% 20%,rgba(118,83,255,.12),transparent 55%),rgba(8,13,25,.75)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "30px",
            }}
          >
            {/* FILE ICON */}
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "18px",
                display: "grid",
                placeItems: "center",
                background:
                  "linear-gradient(135deg,rgba(126,91,255,.20),rgba(75,150,255,.12))",
                border:
                  "1px solid rgba(141,124,255,.3)",
                boxShadow:
                  "0 0 30px rgba(117,82,255,.16)",
                marginBottom: "18px",
              }}
            >
              <span
                style={{
                  fontSize: "32px",
                }}
              >
                📄
              </span>
            </div>

            <h2
              style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "20px",
                fontWeight: "800",
              }}
            >
              Choose your resume
            </h2>

            <p
              style={{
                color: "#7f8ba1",
                fontSize: "12px",
                margin: "8px 0 20px",
              }}
            >
              PDF files only
            </p>

            {/* FILE INPUT */}
            <label
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 15px",
                borderRadius: "10px",
                background: "rgba(255,255,255,.05)",
                border:
                  "1px solid rgba(255,255,255,.10)",
                color: "#dce2ef",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              Choose PDF
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => {
                  setFile(e.target.files?.[0] || null);
                  setError("");
                  setResult(null);
                  setAnalysis(null);
                }}
                style={{
                  display: "none",
                }}
              />
            </label>

            {/* SELECTED FILE */}
            {file && (
              <div
                style={{
                  marginTop: "15px",
                  padding: "9px 13px",
                  borderRadius: "9px",
                  background:
                    "rgba(94,220,178,.08)",
                  border:
                    "1px solid rgba(94,220,178,.18)",
                  color: "#72dfb7",
                  fontSize: "11px",
                  maxWidth: "90%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                ✓ {file.name}
              </div>
            )}

            {/* UPLOAD BUTTON */}
            <button
              onClick={handleUpload}
              disabled={uploading}
              style={{
                width: "100%",
                maxWidth: "700px",
                marginTop: "24px",
                padding: "15px",
                border: "0",
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg,#7657ff,#b84cff)",
                color: "#ffffff",
                fontWeight: "800",
                fontSize: "13px",
                cursor: uploading ? "wait" : "pointer",
                opacity: uploading ? 0.65 : 1,
                boxShadow:
                  "0 10px 30px rgba(112,80,255,.25)",
              }}
            >
              {uploading
                ? "Uploading Resume..."
                : "Upload Resume →"}
            </button>
          </div>

          {/* ERROR */}
          {error && (
            <div
              style={{
                marginTop: "18px",
                padding: "13px",
                borderRadius: "11px",
                background:
                  "rgba(255,70,90,.08)",
                border:
                  "1px solid rgba(255,70,90,.2)",
                color: "#ff9ca7",
                fontSize: "12px",
              }}
            >
              {error}
            </div>
          )}

          {/* UPLOAD RESULT */}
          {result && (
            <div
              style={{
                marginTop: "18px",
                padding: "20px",
                borderRadius: "16px",
                background:
                  "linear-gradient(145deg,rgba(10,39,34,.9),rgba(9,20,25,.96))",
                border:
                  "1px solid rgba(65,210,165,.25)",
              }}
            >
              <div
                style={{
                  color: "#5fe0b2",
                  fontSize: "12px",
                  fontWeight: "800",
                  marginBottom: "12px",
                }}
              >
                ✓ Resume Uploaded Successfully
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(180px,1fr))",
                  gap: "12px",
                }}
              >
                <div>
                  <div
                    style={{
                      color: "#78859b",
                      fontSize: "10px",
                    }}
                  >
                    Resume ID
                  </div>

                  <div
                    style={{
                      color: "#ffffff",
                      fontSize: "16px",
                      fontWeight: "800",
                      marginTop: "3px",
                    }}
                  >
                    {result.resume_id}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      color: "#78859b",
                      fontSize: "10px",
                    }}
                  >
                    Extracted Characters
                  </div>

                  <div
                    style={{
                      color: "#ffffff",
                      fontSize: "16px",
                      fontWeight: "800",
                      marginTop: "3px",
                    }}
                  >
                    {result.text_length ||
                      result.extracted_characters ||
                      "—"}
                  </div>
                </div>
              </div>

              {/* ANALYZE BUTTON */}
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                style={{
                  width: "100%",
                  marginTop: "18px",
                  padding: "14px",
                  border: "1px solid rgba(141,124,255,.3)",
                  borderRadius: "11px",
                  background:
                    "rgba(141,124,255,.10)",
                  color: "#bdb2ff",
                  fontWeight: "800",
                  fontSize: "12px",
                  cursor: analyzing
                    ? "wait"
                    : "pointer",
                  opacity: analyzing ? 0.6 : 1,
                }}
              >
                {analyzing
                  ? "Analyzing Resume..."
                  : "Analyze Resume with CareerIQ →"}
              </button>
            </div>
          )}
        </div>

        {/* ANALYSIS */}
        {analysis && (
          <div
            style={{
              marginTop: "22px",
              padding: "26px",
              borderRadius: "20px",
              background:
                "linear-gradient(145deg,rgba(22,20,55,.98),rgba(10,16,30,.98))",
              border:
                "1px solid rgba(126,100,255,.35)",
              boxShadow:
                "0 20px 50px rgba(70,50,180,.14)",
            }}
          >
            <div
              style={{
                color: "#a999ff",
                fontSize: "11px",
                fontWeight: "800",
                letterSpacing: "1.3px",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Career Intelligence
            </div>

            <h2
              style={{
                margin: 0,
                fontSize: "24px",
                fontWeight: "850",
                background:
                  "linear-gradient(90deg,#9b7cff,#e66cff,#4fa9ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              Resume Analysis Report
            </h2>

            <div
              style={{
                marginTop: "20px",
                padding: "20px",
                borderRadius: "15px",
                background: "rgba(255,255,255,.035)",
                border:
                  "1px solid rgba(255,255,255,.07)",
                color: "#d5dbea",
                fontSize: "13px",
                lineHeight: "1.8",
                whiteSpace: "pre-wrap",
              }}
            >
              {analysis}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeUpload;