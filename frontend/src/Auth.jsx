import { useState } from "react";
import api from "./api";

const validatePassword = (password) => {
  const letters = (password.match(/[A-Za-z]/g) || []).length;
  const hasDigit = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9\s]/.test(password);

  if (letters < 5) {
    return "Password must contain at least 5 letters.";
  }

  if (!hasDigit) {
    return "Password must contain at least 1 digit.";
  }

  if (!hasSymbol) {
    return "Password must contain at least 1 symbol.";
  }

  return "";
};

function Auth({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isLogin = mode === "login";

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (!isLogin) {
      const passwordError = validatePassword(form.password);

      if (passwordError) {
        setError(passwordError);
        setLoading(false);
        return;
      }
    }

    try {
      if (isLogin) {
        const response = await api.post("/auth/login", {
          email: form.email,
          password: form.password,
        });

        const token = response.data.access_token;

        if (!token) {
          throw new Error("Login succeeded but no access token was returned.");
        }

        localStorage.setItem("access_token", token);

        // Get the logged-in user's profile from the backend.
        // This makes the login flow work even if /auth/login
        // returns only the JWT.
        let loggedInUser = response.data.user;

        if (!loggedInUser) {
          const meResponse = await api.get("/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          loggedInUser = meResponse.data;
        }

        if (!loggedInUser) {
          throw new Error("Unable to load your user profile.");
        }

        localStorage.setItem(
          "user",
          JSON.stringify(loggedInUser)
        );

        onLogin(loggedInUser);
      } else {
        await api.post("/auth/register", {
          name: form.name,
          email: form.email,
          password: form.password,
        });

        setMessage("Account created successfully. Please sign in.");
        setMode("login");
        setForm({
          name: "",
          email: form.email,
          password: "",
        });
      }
    } catch (err) {
      const detail = err.response?.data?.detail;

      if (
        isLogin &&
        (err.response?.status === 401 ||
          String(detail || "").toLowerCase().includes("incorrect"))
      ) {
        setError("Incorrect email or password. Please try again.");
      } else {
        setError(
          detail ||
            "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .auth-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 15% 20%,
              rgba(105, 81, 255, 0.22),
              transparent 28%
            ),
            radial-gradient(
              circle at 85% 15%,
              rgba(47, 140, 255, 0.17),
              transparent 25%
            ),
            radial-gradient(
              circle at 70% 90%,
              rgba(177, 75, 255, 0.12),
              transparent 28%
            ),
            #060911;
          color: #f7f8ff;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        .auth-grid {
          position: absolute;
          inset: 0;
          opacity: 0.22;
          background-image:
            linear-gradient(
              rgba(255,255,255,0.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.025) 1px,
              transparent 1px
            );
          background-size: 42px 42px;
          mask-image: linear-gradient(
            to bottom,
            black,
            transparent 85%
          );
          pointer-events: none;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(2px);
          pointer-events: none;
        }

        .orb-one {
          width: 260px;
          height: 260px;
          left: -120px;
          top: 35%;
          background: radial-gradient(
            circle,
            rgba(115,87,255,0.24),
            transparent 68%
          );
        }

        .orb-two {
          width: 330px;
          height: 330px;
          right: -160px;
          bottom: -100px;
          background: radial-gradient(
            circle,
            rgba(47,140,255,0.18),
            transparent 68%
          );
        }

        .auth-layout {
          width: min(1050px, 100%);
          min-height: 650px;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 28px;
          overflow: hidden;
          position: relative;
          z-index: 2;
          background: rgba(12,16,27,0.78);
          backdrop-filter: blur(24px);
          box-shadow:
            0 35px 100px rgba(0,0,0,0.48),
            0 0 70px rgba(99,77,255,0.08);
        }

        .auth-showcase {
          padding: 54px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid rgba(255,255,255,0.07);
          background:
            radial-gradient(
              circle at 80% 20%,
              rgba(112,91,255,0.25),
              transparent 32%
            ),
            linear-gradient(
              145deg,
              rgba(20,25,43,0.94),
              rgba(9,13,23,0.95)
            );
        }

        .showcase-glow {
          position: absolute;
          width: 260px;
          height: 260px;
          right: -110px;
          top: -90px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(126,108,255,0.30),
            transparent 70%
          );
          filter: blur(8px);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 13px;
          position: relative;
          z-index: 1;
        }

        .brand-logo {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border-radius: 15px;
          color: white;
          font-size: 15px;
          font-weight: 900;
          background:
            linear-gradient(
              135deg,
              #9a7cff,
              #694fff 48%,
              #359cff
            );
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow:
            0 12px 35px rgba(91,76,255,0.38),
            inset 0 1px 0 rgba(255,255,255,0.28);
        }

        .brand-name {
          font-size: 17px;
          font-weight: 800;
          letter-spacing: -0.4px;
        }

        .brand-subtitle {
          margin-top: 3px;
          color: #737f9c;
          font-size: 9px;
          letter-spacing: 1.1px;
          font-weight: 600;
        }

        .showcase-content {
          position: relative;
          z-index: 1;
          max-width: 470px;
          margin-top: 30px;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 11px;
          border-radius: 999px;
          color: #aaa0ff;
          background: rgba(115,87,255,0.11);
          border: 1px solid rgba(130,110,255,0.18);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #8d7cff;
          box-shadow: 0 0 12px #8d7cff;
        }

        .showcase-title {
          margin-top: 22px;
          font-size: clamp(36px, 4vw, 54px);
          line-height: 1.02;
          letter-spacing: -2.6px;
          font-weight: 850;
        }

        .gradient-text {
          display: block;
          background:
            linear-gradient(
              90deg,
              #b99bff 0%,
              #8d72ff 42%,
              #55aaff 100%
            );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .showcase-copy {
          max-width: 430px;
          margin-top: 18px;
          color: #8994ad;
          line-height: 1.75;
          font-size: 13px;
        }

        .feature-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-top: 28px;
        }

        .feature {
          padding: 13px;
          border-radius: 13px;
          border: 1px solid rgba(255,255,255,0.065);
          background: rgba(255,255,255,0.025);
        }

        .feature-icon {
          color: #9c8cff;
          font-size: 14px;
          margin-bottom: 7px;
        }

        .feature-title {
          font-size: 11px;
          font-weight: 750;
        }

        .feature-text {
          color: #68738c;
          font-size: 9px;
          margin-top: 3px;
        }

        .showcase-footer {
          color: #58637b;
          font-size: 9px;
          letter-spacing: 0.2px;
          position: relative;
          z-index: 1;
        }

        .auth-panel {
          padding: 48px 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            linear-gradient(
              145deg,
              rgba(14,19,31,0.82),
              rgba(8,12,21,0.92)
            );
        }

        .auth-box {
          width: min(390px, 100%);
        }

        .auth-heading {
          font-size: 30px;
          line-height: 1.1;
          letter-spacing: -1.2px;
          font-weight: 820;
        }

        .auth-description {
          color: #748099;
          font-size: 12px;
          line-height: 1.6;
          margin-top: 9px;
          margin-bottom: 26px;
        }

        .mode-switch {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 4px;
          border-radius: 12px;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.07);
          margin-bottom: 24px;
        }

        .mode-button {
          border: 0;
          border-radius: 9px;
          padding: 10px;
          background: transparent;
          color: #69758e;
          cursor: pointer;
          font-size: 11px;
          font-weight: 750;
          transition: 0.2s ease;
        }

        .mode-button.active {
          color: #fff;
          background:
            linear-gradient(
              135deg,
              rgba(116,91,255,0.34),
              rgba(73,126,255,0.20)
            );
          box-shadow:
            inset 0 0 0 1px rgba(140,120,255,0.16),
            0 5px 18px rgba(91,76,255,0.12);
        }

        .field {
          margin-bottom: 15px;
        }

        .field-label {
          display: block;
          color: #9ba5bb;
          font-size: 10px;
          font-weight: 650;
          margin-bottom: 7px;
        }

        .input-wrap {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 13px;
          top: 50%;
          transform: translateY(-50%);
          color: #5d6881;
          font-size: 13px;
          pointer-events: none;
        }

        .input {
          width: 100%;
          height: 46px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 11px;
          outline: none;
          padding: 0 13px 0 38px;
          color: #f5f7fb;
          background: rgba(255,255,255,0.025);
          font-family: inherit;
          font-size: 12px;
          transition: 0.2s ease;
        }

        .input::placeholder {
          color: #4f5a71;
        }

        .input:focus {
          border-color: rgba(124,101,255,0.65);
          background: rgba(104,82,255,0.045);
          box-shadow:
            0 0 0 3px rgba(104,82,255,0.09),
            0 8px 25px rgba(70,55,180,0.08);
        }

        .submit-button {
          width: 100%;
          height: 48px;
          margin-top: 7px;
          border: 0;
          border-radius: 11px;
          color: white;
          cursor: pointer;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.1px;
          background:
            linear-gradient(
              100deg,
              #7656ff 0%,
              #6248ed 48%,
              #477eea 100%
            );
          box-shadow:
            0 12px 30px rgba(91,76,255,0.25),
            inset 0 1px 0 rgba(255,255,255,0.18);
          transition: 0.2s ease;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow:
            0 16px 35px rgba(91,76,255,0.34),
            inset 0 1px 0 rgba(255,255,255,0.20);
        }

        .submit-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-button:disabled {
          cursor: wait;
          opacity: 0.65;
        }

        .status {
          margin-bottom: 15px;
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 10px;
          line-height: 1.5;
        }

        .status.error {
          color: #ff9ca7;
          background: rgba(255,82,100,0.08);
          border: 1px solid rgba(255,82,100,0.15);
        }

        .status.success {
          color: #69d7ae;
          background: rgba(68,210,158,0.08);
          border: 1px solid rgba(68,210,158,0.15);
        }

        .auth-note {
          margin-top: 17px;
          text-align: center;
          color: #58637a;
          font-size: 9px;
          line-height: 1.5;
        }

        .auth-note strong {
          color: #8d7cff;
          font-weight: 700;
        }

        @media (max-width: 820px) {
          .auth-page {
            padding: 18px;
          }

          .auth-layout {
            grid-template-columns: 1fr;
            max-width: 520px;
            min-height: auto;
          }

          .auth-showcase {
            min-height: 330px;
            padding: 32px;
            border-right: 0;
            border-bottom: 1px solid rgba(255,255,255,0.07);
          }

          .showcase-title {
            font-size: 38px;
          }

          .showcase-copy {
            font-size: 12px;
          }

          .feature-list {
            display: none;
          }

          .showcase-footer {
            margin-top: 35px;
          }

          .auth-panel {
            padding: 35px 28px 40px;
          }
        }

        @media (max-width: 480px) {
          .auth-page {
            padding: 10px;
          }

          .auth-layout {
            border-radius: 21px;
          }

          .auth-showcase {
            padding: 26px;
          }

          .auth-panel {
            padding: 30px 22px 34px;
          }

          .showcase-title {
            font-size: 34px;
          }
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-grid" />
        <div className="orb orb-one" />
        <div className="orb orb-two" />

        <div className="auth-layout">
          <section className="auth-showcase">
            <div className="showcase-glow" />

            <div className="brand">
              <div className="brand-logo">AI</div>
              <div>
                <div className="brand-name">CareerIQ</div>
                <div className="brand-subtitle">
                  AI CAREER INTELLIGENCE PLATFORM
                </div>
              </div>
            </div>

            <div className="showcase-content">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                Career Intelligence
              </div>

              <h1 className="showcase-title">
                Build your next
                <span className="gradient-text">
                  career move.
                </span>
              </h1>

              <p className="showcase-copy">
                Analyze your resume, match your profile with jobs,
                discover skill gaps and build a focused career roadmap
                from one intelligent workspace.
              </p>

              <div className="feature-list">
                <div className="feature">
                  <div className="feature-icon">◈</div>
                  <div className="feature-title">
                    Resume Intelligence
                  </div>
                  <div className="feature-text">
                    Understand your profile
                  </div>
                </div>

                <div className="feature">
                  <div className="feature-icon">⌁</div>
                  <div className="feature-title">
                    Job Matching
                  </div>
                  <div className="feature-text">
                    Measure job compatibility
                  </div>
                </div>

                <div className="feature">
                  <div className="feature-icon">✦</div>
                  <div className="feature-title">
                    Skill Gaps
                  </div>
                  <div className="feature-text">
                    Find what to improve
                  </div>
                </div>

                <div className="feature">
                  <div className="feature-icon">↗</div>
                  <div className="feature-title">
                    Career Roadmap
                  </div>
                  <div className="feature-text">
                    Follow a focused path
                  </div>
                </div>
              </div>
            </div>

            <div className="showcase-footer">
              Your career data stays inside your CareerIQ workspace.
            </div>
          </section>

          <section className="auth-panel">
            <div className="auth-box">
              <h2 className="auth-heading">
                {isLogin ? "Welcome back" : "Create your account"}
              </h2>

              <p className="auth-description">
                {isLogin
                  ? "Sign in to continue to your career intelligence dashboard."
                  : "Create your CareerIQ workspace and start building your career strategy."}
              </p>

              <div className="mode-switch">
                <button
                  type="button"
                  className={`mode-button ${
                    isLogin ? "active" : ""
                  }`}
                  onClick={() => {
                    setMode("login");
                    setError("");
                    setMessage("");
                  }}
                >
                  Sign In
                </button>

                <button
                  type="button"
                  className={`mode-button ${
                    !isLogin ? "active" : ""
                  }`}
                  onClick={() => {
                    setMode("register");
                    setError("");
                    setMessage("");
                  }}
                >
                  Create Account
                </button>
              </div>

              {error && (
                <div className="status error">
                  {error}
                </div>
              )}

              {message && (
                <div className="status success">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="field">
                    <label className="field-label">
                      Full Name
                    </label>
                    <div className="input-wrap">
                      <span className="input-icon">◯</span>
                      <input
                        className="input"
                        type="text"
                        placeholder="Prasad Bari"
                        value={form.name}
                        onChange={(event) =>
                          updateField("name", event.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="field">
                  <label className="field-label">
                    Email Address
                  </label>
                  <div className="input-wrap">
                    <span className="input-icon">@</span>
                    <input
                      className="input"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="field-label">
                    Password
                  </label>
                  <div className="input-wrap">
                    <span className="input-icon">●</span>
                    <input
                      className="input"
                      type="password"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={(event) =>
                        updateField("password", event.target.value)
                      }
                      required
                    />
                  </div>

                  {!isLogin && (
                    <div
                      style={{
                        marginTop: "-7px",
                        marginBottom: "15px",
                        padding: "10px 12px",
                        borderRadius: "10px",
                        border: "1px solid rgba(255,255,255,0.06)",
                        background: "rgba(255,255,255,0.025)",
                        color: "#68738c",
                        fontSize: "9px",
                        lineHeight: "1.7",
                      }}
                    >
                      <div
                        style={{
                          color: "#8e99b0",
                          fontWeight: 700,
                          marginBottom: "2px",
                        }}
                      >
                        Password requirements
                      </div>
                      <div>• At least 5 letters</div>
                      <div>• At least 1 number</div>
                      <div>• At least 1 symbol (for example: @ # $ !)</div>
                    </div>
                  )}
                </div>

                <button
                  className="submit-button"
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? "Please wait..."
                    : isLogin
                    ? "Sign In →"
                    : "Create Account →"}
                </button>
              </form>

              <div className="auth-note">
                {isLogin
                  ? "New to CareerIQ? "
                  : "Already have an account? "}
                <strong>
                  {isLogin
                    ? "Use Create Account above"
                    : "Use Sign In above"}
                </strong>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Auth;
