import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  AutoAwesome,
  Bolt,
  Hub,
  Insights,
  Lock,
  Logout,
  Psychology,
  RocketLaunch,
  VerifiedUser,
} from "@mui/icons-material";
import { Button } from "@mui/material";

const features = [
  {
    icon: <Psychology />,
    title: "Adaptive AI Assistants",
    text: "Context-aware assistants for faster decisions and cleaner work.",
  },
  {
    icon: <Hub />,
    title: "Connected Workflows",
    text: "Bring prompts, approvals, and actions into one smooth flow.",
  },
  {
    icon: <Lock />,
    title: "Secure by Default",
    text: "Protected access with hashed passwords and MongoDB storage.",
  },
  {
    icon: <Insights />,
    title: "Live Intelligence",
    text: "Turn user and product signals into useful recommendations.",
  },
  {
    icon: <Bolt />,
    title: "Fast Prototyping",
    text: "Move from idea to working experience without heavy setup.",
  },
  {
    icon: <VerifiedUser />,
    title: "Human Review",
    text: "Keep people in control where judgment matters.",
  },
];

const workflow = [
  {
    title: "Ingest",
    text: "Collect the right signals.",
  },
  {
    title: "Reason",
    text: "Let AI classify, summarize, and recommend.",
  },
  {
    title: "Act",
    text: "Turn insights into action.",
  },
];

function Home() {
  const navigate = useNavigate();
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("authUser"));
    } catch {
      return null;
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/");
  };

  return (
    <div className="home-page">
      <nav className="home-nav">
        <div className="brand-mark">
          <span className="brand-icon">AI</span>
          NeuralFlow
        </div>

        <div className="home-nav-actions">
          <a href="#features">Features</a>
          <a href="#metrics">Metrics</a>
          <span className="user-pill">{user?.name ?? "AI Builder"}</span>
          <Button variant="outlined" startIcon={<Logout />} onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </nav>

      <section className="home-hero">
        <div>
          <span className="eyebrow">
            <AutoAwesome fontSize="small" />
            AI operating layer
          </span>
          <h1>Build smarter products with AI that actually fits your workflow.</h1>
          <p>
            NeuralFlow brings intelligent automation, secure identity, and a polished workspace
            together in one place.
          </p>

          <div className="hero-actions">
            <Button variant="contained" size="large" startIcon={<RocketLaunch />}>
              Launch AI Workspace
            </Button>
            <Button variant="outlined" size="large">
              View Insights
            </Button>
          </div>
        </div>

        <div className="ai-console" aria-label="AI system status">
          <div className="console-top">
            <span />
            <span />
            <span />
          </div>
          <div className="console-body">
            <div className="signal-card">
              <span>Prediction quality</span>
              <strong>94.8% confidence</strong>
              <div className="meter">
                <div style={{ width: "94%" }} />
              </div>
            </div>
            <div className="signal-card">
              <span>Automations running</span>
              <strong>27 workflows active</strong>
              <div className="meter">
                <div style={{ width: "76%" }} />
              </div>
            </div>
            <div className="signal-card">
              <span>Review queue</span>
              <strong>8 human checks pending</strong>
              <div className="meter">
                <div style={{ width: "42%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section" id="features">
        <div className="section-heading">
          <h2>Everything feels fast, focused, and secure.</h2>
          <p>
            A clean AI workspace for users, automations, insights, and protected access.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section deep-band" id="workflow">
        <div className="section-heading">
          <h2>Simple flow. Powerful results.</h2>
          <p>
            Capture signals, reason with context, and move to action without clutter.
          </p>
        </div>

        <div className="workflow-grid">
          {workflow.map((step, index) => (
            <article className="workflow-card" key={step.title}>
              <span className="step-number">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section" id="metrics">
        <div className="section-heading">
          <h2>Built to feel production-ready.</h2>
          <p>
            Beautiful screens, clear states, secure storage, and a smooth authenticated flow.
          </p>
        </div>

        <div className="metric-grid">
          <article className="metric-card">
            <strong>12x</strong>
            <h3>Faster first drafts</h3>
            <p>Start with structure, not blank screens.</p>
          </article>
          <article className="metric-card">
            <strong>38%</strong>
            <h3>Lower manual triage</h3>
            <p>Routine routing becomes automatic.</p>
          </article>
          <article className="metric-card">
            <strong>24/7</strong>
            <h3>Always-on support</h3>
            <p>AI stays available around the clock.</p>
          </article>
        </div>
      </section>

      <footer className="home-footer">
        <span>NeuralFlow AI Workspace</span>
        <span>Secure AI access, beautifully delivered.</span>
      </footer>
    </div>
  );
}

export default Home;
