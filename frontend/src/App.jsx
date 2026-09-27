import CareerRoadmap from "./CareerRoadmap.jsx";
import SkillGap from "./SkillGap.jsx";
import JobMatching from "./JobMatching.jsx";
import ResumeUpload from "./ResumeUpload.jsx";
import { useState } from "react";
import Auth from "./Auth.jsx";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });
  const [activePage, setActivePage] = useState("Dashboard");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("job_match_result");
    setUser(null);
    setActivePage("Dashboard");
    setShowProfileMenu(false);
  };

  const stats = [
    {
      title: "Resume Score",
      value: "86",
      suffix: "/100",
      icon: "◈",
      change: "+12%",
    },
    {
      title: "Jobs Matched",
      value: "18",
      suffix: "",
      icon: "⌁",
      change: "+5 this week",
    },
    {
      title: "Skills Detected",
      value: "14",
      suffix: "",
      icon: "✦",
      change: "3 skill gaps",
    },
    {
      title: "Profile Strength",
      value: "78",
      suffix: "%",
      icon: "◉",
      change: "Good progress",
    },
  ];

  const skills = [
    { name: "Python", level: 92 },
    { name: "SQL", level: 88 },
    { name: "MySQL", level: 84 },
    { name: "Machine Learning", level: 76 },
    { name: "Power BI", level: 72 },
    { name: "FastAPI", level: 48 },
  ];

  const gaps = [
    {
      name: "FastAPI",
      level: "Beginner",
      priority: "High",
    },
    {
      name: "Docker",
      level: "Not detected",
      priority: "Medium",
    },
    {
      name: "AWS",
      level: "Beginner",
      priority: "Medium",
    },
  ];

  const jobs = [
    {
      title: "Junior Python Developer",
      company: "Technology Company",
      score: 86,
      skills: ["Python", "SQL", "Git"],
    },
    {
      title: "Junior Data Engineer",
      company: "Data & Analytics",
      score: 78,
      skills: ["Python", "SQL", "MySQL"],
    },
    {
      title: "Data Analyst",
      company: "Analytics Team",
      score: 74,
      skills: ["SQL", "Power BI", "Excel"],
    },
  ];

 const menuItems = [
  { name: "Dashboard", icon: "⌂" },
  { name: "Resume Intelligence", icon: "▤" },
  { name: "Job Matching", icon: "⌁" },
  { name: "Skill Gap", icon: "✦" },
  { name: "Career Roadmap", icon: "↗" },
];

// Authentication check FIRST
if (!user) {
  return (
    <Auth
      onLogin={(loggedInUser) => {
        setUser(loggedInUser);
      }}
    />
  );
}

// Resume Intelligence page
if (activePage === "Resume Intelligence") {
  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          background: "#080b12",
          padding: "30px",
        }}
      >
        <button
          onClick={() => setActivePage("Dashboard")}
          style={{
            marginBottom: "10px",
            padding: "10px 15px",
            borderRadius: "9px",
            border: "1px solid rgba(255,255,255,.08)",
            background: "rgba(255,255,255,.04)",
            color: "#aaa",
            cursor: "pointer",
          }}
        >
          ← Dashboard
        </button>

        <ResumeUpload />
      </div>
    </>
  );
}
if (activePage === "Skill Gap") {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080b12",
        padding: "30px",
      }}
    >
      <button
        onClick={() => setActivePage("Dashboard")}
        style={{
          marginBottom: "10px",
          padding: "10px 15px",
          borderRadius: "9px",
          border: "1px solid rgba(255,255,255,.08)",
          background: "rgba(255,255,255,.04)",
          color: "#aaa",
          cursor: "pointer",
        }}
      >
        ← Dashboard
      </button>

      <SkillGap />
    </div>  
  );
}
if (activePage === "Career Roadmap") {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080b12",
        padding: "30px",
      }}
    >
      <button
        onClick={() => setActivePage("Dashboard")}
        style={{
          marginBottom: "10px",
          padding: "10px 15px",
          borderRadius: "9px",
          border: "1px solid rgba(255,255,255,.08)",
          background: "rgba(255,255,255,.04)",
          color: "#aaa",
          cursor: "pointer",
        }}
      >
        ← Dashboard
      </button>

      <CareerRoadmap />
    </div>
  );
}

// Job Matching page
if (activePage === "Job Matching") {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080b12",
        padding: "30px",
      }}
    >
      <button
        onClick={() => setActivePage("Dashboard")}
        style={{
          marginBottom: "10px",
          padding: "10px 15px",
          borderRadius: "9px",
          border: "1px solid rgba(255,255,255,.08)",
          background: "rgba(255,255,255,.04)",
          color: "#aaa",
          cursor: "pointer",
        }}
      >
        ← Dashboard
      </button>

      <JobMatching />
    </div>
  );
}

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
          background: #080b12;
          color: #f5f7fb;
        }

        button {
          font-family: inherit;
        }

        .app {
          min-height: 100vh;
          display: flex;
          background:
            radial-gradient(
              circle at 80% 10%,
              rgba(91, 76, 255, 0.13),
              transparent 28%
            ),
            radial-gradient(
              circle at 20% 90%,
              rgba(0, 200, 255, 0.08),
              transparent 25%
            ),
            #080b12;
        }

        /* SIDEBAR */

        .sidebar {
          width: 250px;
          min-height: 100vh;
          padding: 28px 18px;
          border-right: 1px solid rgba(255,255,255,0.07);
          background: rgba(9,12,20,0.92);
          backdrop-filter: blur(20px);
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          z-index: 10;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 10px;
          margin-bottom: 45px;
        }

        .brand-logo {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          font-weight: 800;
          color: white;
          background:
            linear-gradient(135deg, #7357ff, #2f8cff);
          box-shadow: 0 0 25px rgba(91,76,255,0.4);
        }

        .brand-text {
          font-size: 17px;
          font-weight: 750;
          letter-spacing: -0.4px;
        }

        .brand-text span {
          display: block;
          color: #7d88a5;
          font-size: 10px;
          font-weight: 500;
          margin-top: 2px;
          letter-spacing: 0.5px;
        }

        .nav-title {
          color: #555e76;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          padding: 0 12px;
          margin-bottom: 12px;
        }

        .nav {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .nav-item {
          width: 100%;
          border: 0;
          background: transparent;
          color: #858da3;
          padding: 12px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          text-align: left;
          transition: 0.2s ease;
          font-size: 13px;
        }

        .nav-item:hover {
          color: white;
          background: rgba(255,255,255,0.045);
        }

        .nav-item.active {
          color: white;
          background:
            linear-gradient(
              90deg,
              rgba(105,81,255,0.22),
              rgba(105,81,255,0.06)
            );
          border: 1px solid rgba(116,94,255,0.18);
        }

        .nav-icon {
          width: 22px;
          text-align: center;
          font-size: 17px;
        }

        .sidebar-bottom {
          position: absolute;
          bottom: 22px;
          left: 18px;
          right: 18px;
        }

        .upgrade {
          padding: 16px;
          border-radius: 16px;
          background:
            linear-gradient(
              145deg,
              rgba(106,82,255,0.18),
              rgba(32,37,57,0.5)
            );
          border: 1px solid rgba(113,94,255,0.2);
        }

        .upgrade-title {
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 7px;
        }

        .upgrade-text {
          font-size: 11px;
          line-height: 1.5;
          color: #858da3;
          margin-bottom: 12px;
        }

        .upgrade-button {
          width: 100%;
          border: 0;
          border-radius: 9px;
          padding: 9px;
          color: white;
          background: #604cff;
          cursor: pointer;
          font-size: 11px;
          font-weight: 700;
        }

        /* MAIN */

        .main {
          margin-left: 250px;
          width: calc(100% - 250px);
          padding: 28px 34px 50px;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .welcome h1 {
          font-size: 28px;
          letter-spacing: -1px;
          margin-bottom: 6px;
        }

        .welcome p {
          color: #788197;
          font-size: 13px;
        }

        .top-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .icon-button {
          width: 38px;
          height: 38px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 11px;
          background: rgba(255,255,255,0.025);
          color: #9ba4bb;
          cursor: pointer;
        }

        .profile {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-left: 8px;
          padding: 6px 8px 6px 14px;
          border-left: 1px solid rgba(255,255,255,0.08);
          border-radius: 13px;
          position: relative;
          cursor: pointer;
          transition: 0.2s ease;
          outline: none;
        }

        .profile:hover,
        .profile:focus-visible {
          background: rgba(255,255,255,0.045);
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg,#7357ff,#2f8cff);
          font-size: 12px;
          font-weight: 800;
        }

        .profile-name {
          font-size: 12px;
          font-weight: 700;
        }

        .profile-role {
          color: #69738b;
          font-size: 10px;
          margin-top: 2px;
        }

        .profile-chevron {
          color: #7f8aa3;
          font-size: 13px;
        }

        .profile-menu {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          width: 205px;
          padding: 10px;
          border-radius: 16px;
          background: linear-gradient(145deg, rgba(22,28,45,0.98), rgba(10,15,26,0.98));
          border: 1px solid rgba(255,255,255,0.10);
          box-shadow: 0 20px 55px rgba(0,0,0,0.48), 0 0 30px rgba(99,77,255,0.10);
          backdrop-filter: blur(22px);
          z-index: 1000;
          animation: profileDrop 0.16s ease-out;
        }

        @keyframes profileDrop {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .profile-menu-user {
          padding: 8px 9px 9px;
        }

        .profile-menu-name {
          color: #f5f7fb;
          font-size: 12px;
          font-weight: 750;
        }

        .profile-menu-label {
          color: #69738b;
          font-size: 10px;
          margin-top: 3px;
        }

        .profile-menu-divider {
          height: 1px;
          margin: 3px 4px 7px;
          background: rgba(255,255,255,0.07);
        }

        .logout-button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 9px;
          border: 0;
          border-radius: 10px;
          padding: 10px 9px;
          background: transparent;
          color: #ff8b98;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          text-align: left;
          transition: 0.2s ease;
        }

        .logout-button:hover {
          background: rgba(255,91,107,0.10);
          color: #ffb0b8;
        }

        .logout-button span {
          font-size: 15px;
        }

        /* HERO */

        .hero {
          min-height: 245px;
          padding: 30px;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            radial-gradient(
              circle at 85% 35%,
              rgba(99,77,255,0.3),
              transparent 25%
            ),
            linear-gradient(
              120deg,
              rgba(25,29,45,0.98),
              rgba(14,18,29,0.96)
            );
          position: relative;
          overflow: hidden;
          margin-bottom: 22px;
        }

        .hero::before {
          content: "";
          position: absolute;
          width: 300px;
          height: 300px;
          border: 1px solid rgba(118,96,255,0.13);
          border-radius: 50%;
          right: -100px;
          top: -130px;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 650px;
        }

        .hero-label {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 10px;
          border-radius: 20px;
          background: rgba(98,78,255,0.13);
          border: 1px solid rgba(109,88,255,0.22);
          color: #9d91ff;
          font-size: 10px;
          font-weight: 700;
          margin-bottom: 17px;
        }

        .pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #7e6cff;
          box-shadow: 0 0 10px #7e6cff;
        }

        .hero h2 {
          font-size: 34px;
          line-height: 1.12;
          letter-spacing: -1.4px;
          margin-bottom: 12px;
          color: #f7f8ff;
        }

        .hero h2 span {
          background: linear-gradient(90deg, #a98bff 0%, #7d6dff 45%, #4fa9ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .hero p {
          max-width: 560px;
          color: #818ba2;
          line-height: 1.7;
          font-size: 13px;
          margin-bottom: 22px;
        }

        .hero-actions {
          display: flex;
          gap: 10px;
        }

        .primary-button,
        .secondary-button {
          border-radius: 10px;
          padding: 11px 17px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 700;
          transition: 0.2s;
        }

        .primary-button {
          color: white;
          border: 0;
          background: linear-gradient(135deg,#7357ff,#5642db);
          box-shadow: 0 8px 25px rgba(91,76,255,0.22);
        }

        .primary-button:hover {
          transform: translateY(-2px);
        }

        .secondary-button {
          color: #a8b0c3;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.03);
        }

        /* STATS */

        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          margin-bottom: 22px;
        }

        .stat-card {
          padding: 20px;
          border-radius: 17px;
          border: 1px solid rgba(255,255,255,0.07);
          background: linear-gradient(145deg, rgba(19,24,39,0.86), rgba(13,17,28,0.78));
          box-shadow: 0 12px 30px rgba(0,0,0,0.13);
          transition: 0.25s ease;
          position: relative;
          overflow: hidden;
        }

        .stat-card::after {
          content: "";
          position: absolute;
          width: 90px;
          height: 90px;
          right: -35px;
          top: -35px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(115,87,255,0.14), transparent 68%);
          pointer-events: none;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          border-color: rgba(112,91,255,0.25);
        }

        .stat-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 17px;
        }

        .stat-icon {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: rgba(105,82,255,0.12);
          color: #8d7cff;
        }

        .stat-change {
          font-size: 9px;
          color: #55c99a;
          background: rgba(55,201,145,0.08);
          padding: 4px 7px;
          border-radius: 10px;
        }

        .stat-title {
          color: #737d94;
          font-size: 11px;
          margin-bottom: 6px;
        }

        .stat-value {
          font-size: 25px;
          font-weight: 750;
          letter-spacing: -0.8px;
        }

        .stat-value small {
          font-size: 12px;
          color: #6f788d;
          font-weight: 500;
        }

        /* GRID */

        .content-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 20px;
        }

        .card {
          border: 1px solid rgba(255,255,255,0.07);
          background: linear-gradient(145deg, rgba(18,23,37,0.84), rgba(12,16,27,0.78));
          border-radius: 18px;
          padding: 22px;
          box-shadow: 0 14px 35px rgba(0,0,0,0.16);
          transition: 0.25s ease;
        }

        .card:hover {
          transform: translateY(-2px);
          border-color: rgba(119,99,255,0.16);
          box-shadow: 0 18px 45px rgba(0,0,0,0.22), 0 0 28px rgba(91,76,255,0.05);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 22px;
        }

        .card-title {
          font-size: 14px;
          font-weight: 750;
        }

        .card-subtitle {
          color: #69738b;
          font-size: 10px;
          margin-top: 4px;
        }

        .view-all {
          color: #8e80ff;
          border: 0;
          background: transparent;
          cursor: pointer;
          font-size: 10px;
        }

        /* SKILLS */

        .skill-row {
          margin-bottom: 17px;
        }

        .skill-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 7px;
          font-size: 11px;
        }

        .skill-name {
          color: #b8c0d1;
        }

        .skill-percent {
          color: #727d94;
        }

        .progress {
          height: 6px;
          border-radius: 10px;
          background: #202637;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg,#6751f5,#39a5ff);
        }

        /* SCORE */

        .score-section {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .score-circle {
          width: 125px;
          height: 125px;
          flex-shrink: 0;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background:
            radial-gradient(circle, #111622 57%, transparent 58%),
            conic-gradient(#745dff 0deg 309deg,#23293a 309deg 360deg);
          position: relative;
        }

        .score-number {
          text-align: center;
        }

        .score-number strong {
          display: block;
          font-size: 31px;
        }

        .score-number span {
          color: #707a91;
          font-size: 9px;
        }

        .score-details h3 {
          font-size: 14px;
          margin-bottom: 8px;
        }

        .score-details p {
          color: #737d94;
          font-size: 11px;
          line-height: 1.6;
          margin-bottom: 12px;
        }

        .score-tag {
          display: inline-block;
          padding: 5px 9px;
          border-radius: 8px;
          background: rgba(79,201,149,0.09);
          color: #5bd0a1;
          font-size: 9px;
        }

        /* JOBS */

        .job-card {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 13px 0;
          border-bottom: 1px solid rgba(255,255,255,0.055);
        }

        .job-card:last-child {
          border-bottom: 0;
        }

        .job-logo {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: rgba(107,86,255,0.12);
          color: #9487ff;
          font-weight: 800;
          font-size: 12px;
        }

        .job-info {
          flex: 1;
        }

        .job-title {
          font-size: 11px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .job-company {
          font-size: 9px;
          color: #687289;
        }

        .job-score {
          text-align: right;
        }

        .match {
          color: #60d3a6;
          font-size: 13px;
          font-weight: 800;
        }

        .match-label {
          color: #596278;
          font-size: 8px;
        }

        /* GAPS */

        .gap-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .gap-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 11px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.045);
        }

        .gap-icon {
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          border-radius: 8px;
          background: rgba(238,159,73,0.1);
          color: #e9a34d;
          font-size: 12px;
        }

        .gap-info {
          flex: 1;
        }

        .gap-name {
          font-size: 11px;
          font-weight: 700;
        }

        .gap-level {
          color: #69738a;
          font-size: 9px;
          margin-top: 3px;
        }

        .priority {
          font-size: 8px;
          padding: 4px 7px;
          border-radius: 7px;
        }

        .priority.high {
          color: #ff7d88;
          background: rgba(255,91,107,0.08);
        }

        .priority.medium {
          color: #e7a14e;
          background: rgba(231,161,78,0.08);
        }

        /* RESPONSIVE */

        @media (max-width: 1100px) {
          .stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .content-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 800px) {
          .sidebar {
            width: 70px;
            padding: 20px 10px;
          }

          .brand-text,
          .nav-title,
          .nav-item span:not(.nav-icon),
          .upgrade {
            display: none;
          }

          .brand {
            justify-content: center;
            padding: 0;
          }

          .nav-item {
            justify-content: center;
          }

          .main {
            margin-left: 70px;
            width: calc(100% - 70px);
            padding: 20px;
          }

          .hero h2 {
            font-size: 25px;
          }

          .stats {
            grid-template-columns: 1fr;
          }

          .topbar {
            align-items: flex-start;
          }

          .profile-name,
          .profile-role,
          .profile-chevron {
            display: none;
          }

          .profile {
            display: flex;
            border-left: 0;
            padding: 0;
          }
        }
      `}</style>

      <div className="app">

        {/* SIDEBAR */}

        <aside className="sidebar">

          <div className="brand">
            <div className="brand-logo">AI</div>

            <div className="brand-text">
              CareerIQ
              <span>INTELLIGENCE PLATFORM</span>
            </div>
          </div>

          <div className="nav-title">
            Workspace
          </div>

          <nav className="nav">
    {menuItems.map((item) => (
        <button
            key={item.name}
            className={`nav-item ${
                activePage === item.name ? "active" : ""
            }`}
            onClick={() => setActivePage(item.name)}
        >
            <span className="nav-icon">
                {item.icon}
            </span>
            <span>{item.name}</span>
        </button>
    ))}
</nav>

          <div className="sidebar-bottom">

            <div className="upgrade">

              <div className="upgrade-title">
                Career Intelligence
              </div>

              <div className="upgrade-text">
                Your profile is continuously improving.
                Keep building skills and projects.
              </div>

              <button
                className="upgrade-button"
                onClick={() => setActivePage("Career Roadmap")}
                type="button"
              >
                View Roadmap →
              </button>

            </div>

          </div>

        </aside>

        {/* MAIN CONTENT */}

        <main className="main">

          {/* TOP BAR */}

          <header className="topbar">

            <div className="welcome">

              <h1
                style={{
                  margin: 0,
                  fontSize: "30px",
                  fontWeight: "800",
                  letterSpacing: "-1px",
                  background:
                    "linear-gradient(90deg,#ffffff 0%,#b99bff 45%,#5aa9ff 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  textShadow: "0 0 28px rgba(190,105,255,0.18)",
                }}
              >
                <>
                  Good afternoon, {user?.name || "there"}{" "}
                  <span
                    style={{
                      WebkitTextFillColor: "initial",
                      color: "initial",
                      background: "none",
                      WebkitBackgroundClip: "initial",
                      backgroundClip: "initial",
                      textShadow: "none",
                      display: "inline-block",
                    }}
                  >
                    👋
                  </span>
                </>
              </h1>

              <p>
                Here's your career intelligence overview.
              </p>

            </div>

            <div className="top-actions">

              <button
                className="icon-button"
                type="button"
                aria-label="Notifications"
                title="Notifications"
              >
                ♢
              </button>

              <div
                className="profile"
                onClick={() => setShowProfileMenu((current) => !current)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    setShowProfileMenu((current) => !current);
                  }
                }}
              >
                <div className="avatar">
                  {user?.name
                    ? user.name
                        .split(" ")
                        .filter(Boolean)
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()
                    : "U"}
                </div>

                <div>
                  <div className="profile-name">
                    {user?.name || "User"}
                  </div>
                  <div className="profile-role">
                    Career Explorer
                  </div>
                </div>

                <span className="profile-chevron">
                  {showProfileMenu ? "⌃" : "⌄"}
                </span>

                {showProfileMenu && (
                  <div
                    className="profile-menu"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="profile-menu-user">
                      <div className="profile-menu-name">
                        {user?.name || "User"}
                      </div>
                      <div className="profile-menu-label">
                        Signed in
                      </div>
                    </div>

                    <div className="profile-menu-divider" />

                    <button
                      className="logout-button"
                      onClick={handleLogout}
                      type="button"
                    >
                      <span>↪</span>
                      Logout
                    </button>
                  </div>
                )}
              </div>

            </div>

          </header>

          {/* HERO */}

          <section className="hero">

            <div className="hero-content">

              <div className="hero-label">
                <span className="pulse"></span>
                AI CAREER INSIGHTS
              </div>

              <h2>
                Turn your resume into a
                <br />
                <span>career strategy.</span>
              </h2>

              <p>
                Analyze your skills, understand your strengths,
                identify missing capabilities and discover how
                well your profile matches real job requirements.
              </p>

              <div className="hero-actions">

                <button
                  className="primary-button"
                  onClick={() =>
                    setActivePage("Resume Intelligence")
                  }
                >
                  Analyze My Resume →
                </button>

                <button
                  className="secondary-button"
                  onClick={() =>
                    setActivePage("Job Matching")
                  }
                >
                  Match a Job
                </button>

              </div>

            </div>

          </section>

          {/* STATS */}

          <section className="stats">

            {stats.map((stat) => (

              <div className="stat-card" key={stat.title}>

                <div className="stat-top">

                  <div className="stat-icon">
                    {stat.icon}
                  </div>

                  <div className="stat-change">
                    {stat.change}
                  </div>

                </div>

                <div className="stat-title">
                  {stat.title}
                </div>

                <div className="stat-value">

                  {stat.value}

                  <small>
                    {stat.suffix}
                  </small>

                </div>

              </div>

            ))}

          </section>

          {/* CONTENT */}

          <section className="content-grid">

            {/* LEFT */}

            <div>

              <div className="card">

                <div className="card-header">

                  <div>
                    <div className="card-title">
                      Resume Intelligence
                    </div>

                    <div className="card-subtitle">
                      Technical profile detected from your resume
                    </div>
                  </div>

                  <button
                    className="view-all"
                    onClick={() =>
                      setActivePage("Resume Intelligence")
                    }
                  >
                    View Analysis →
                  </button>

                </div>

                <div className="score-section">

                  <div className="score-circle">

                    <div className="score-number">

                      <strong>
                        86
                      </strong>

                      <span>
                        RESUME SCORE
                      </span>

                    </div>

                  </div>

                  <div className="score-details">

                    <h3>
                      Strong technical foundation
                    </h3>

                    <p>
                      Your resume demonstrates relevant
                      programming, database and data skills.
                      Strengthening backend and cloud skills
                      could improve your profile further.
                    </p>

                    <span className="score-tag">
                      ↑ Improving profile
                    </span>

                  </div>

                </div>

              </div>

              <div
                className="card"
                style={{ marginTop: "20px" }}
              >

                <div className="card-header">

                  <div>
                    <div className="card-title">
                      Top Skills
                    </div>

                    <div className="card-subtitle">
                      Detected technical capabilities
                    </div>
                  </div>

                  <button className="view-all">
                    Full Skills →
                  </button>

                </div>

                {skills.map((skill) => (

                  <div
                    className="skill-row"
                    key={skill.name}
                  >

                    <div className="skill-info">

                      <span className="skill-name">
                        {skill.name}
                      </span>

                      <span className="skill-percent">
                        {skill.level}%
                      </span>

                    </div>

                    <div className="progress">

                      <div
                        className="progress-fill"
                        style={{
                          width: `${skill.level}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* RIGHT */}

            <div>

              <div className="card">

                <div className="card-header">

                  <div>
                    <div className="card-title">
                      Best Job Matches
                    </div>

                    <div className="card-subtitle">
                      Based on your current skill profile
                    </div>
                  </div>

                  <button
                    className="view-all"
                    onClick={() =>
                      setActivePage("Job Matching")
                    }
                  >
                    Explore →
                  </button>

                </div>

                {jobs.map((job) => (

                  <div
                    className="job-card"
                    key={job.title}
                  >

                    <div className="job-logo">
                      {job.title.charAt(0)}
                    </div>

                    <div className="job-info">

                      <div className="job-title">
                        {job.title}
                      </div>

                      <div className="job-company">
                        {job.company}
                      </div>

                    </div>

                    <div className="job-score">

                      <div className="match">
                        {job.score}%
                      </div>

                      <div className="match-label">
                        MATCH
                      </div>

                    </div>

                  </div>

                ))}

              </div>

              <div
                className="card"
                style={{ marginTop: "20px" }}
              >

                <div className="card-header">

                  <div>
                    <div className="card-title">
                      Skill Gaps
                    </div>

                    <div className="card-subtitle">
                      Skills that can strengthen your profile
                    </div>
                  </div>

                  <button
                    className="view-all"
                    onClick={() =>
                      setActivePage("Skill Gap")
                    }
                  >
                    View All →
                  </button>

                </div>

                <div className="gap-list">

                  {gaps.map((gap) => (

                    <div
                      className="gap-item"
                      key={gap.name}
                    >

                      <div className="gap-icon">
                        !
                      </div>

                      <div className="gap-info">

                        <div className="gap-name">
                          {gap.name}
                        </div>

                        <div className="gap-level">
                          {gap.level}
                        </div>

                      </div>

                      <div
                        className={`priority ${
                          gap.priority === "High"
                            ? "high"
                            : "medium"
                        }`}
                      >
                        {gap.priority}
                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </section>

        </main>

      </div>
    </>
  );
}

export default App;