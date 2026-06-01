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
    text: "Create task-specific agents that understand context, remember preferences, and move work forward with clear next steps.",
  },
  {
    icon: <Hub />,
    title: "Connected Workflows",
    text: "Route prompts, files, decisions, and approvals through a single intelligent workspace instead of scattered tools.",
  },
  {
    icon: <Lock />,
    title: "Secure by Default",
    text: "Keep identity, access, and audit trails close to every AI action so teams can experiment without losing control.",
  },
  {
    icon: <Insights />,
    title: "Live Intelligence",
    text: "Turn signals from your product, users, and operations into summaries, predictions, and timely recommendations.",
  },
  {
    icon: <Bolt />,
    title: "Fast Prototyping",
    text: "Go from rough ideas to working AI experiences with reusable flows, reusable prompts, and clean feedback loops.",
  },
  {
    icon: <VerifiedUser />,
    title: "Human Review",
    text: "Place people at the right checkpoints with confidence scores, explanations, and easy override paths.",
  },
];

const workflow = [
  {
    title: "Ingest",
    text: "Bring in product data, documents, support conversations, and team notes without forcing everyone into a new process.",
  },
  {
    title: "Reason",
    text: "Use models to classify, summarize, compare, draft, and recommend while preserving the source context behind every answer.",
  },
  {
    title: "Act",
    text: "Send polished outputs to your app, dashboard, CRM, inbox, or internal queue with clear ownership and traceability.",
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
            NeuralFlow helps teams design assistants, automate decisions, and turn noisy data
            into clear action. This is your post-login AI command center.
          </p>

          <div className="hero-actions">
            <Button variant="contained" size="large" startIcon={<RocketLaunch />}>
              Launch Workspace
            </Button>
            <Button variant="outlined" size="large">
              Explore Models
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

      <section className="home-section">
        <div className="section-heading">
          <h2>A practical AI stack for real teams.</h2>
          <p>
            The goal is not another chatbot pasted onto a page. It is a calm, useful system that
            helps people move faster while keeping context, trust, and control in view.
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

      <section className="home-section deep-band">
        <div className="section-heading">
          <h2>From raw inputs to useful action.</h2>
          <p>
            A simple pipeline keeps the experience understandable for users and maintainable for
            developers.
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

      <section className="home-section">
        <div className="section-heading">
          <h2>Designed for outcomes, not demos.</h2>
          <p>
            Track adoption, accuracy, latency, review volume, and business impact from the same
            place your team launches AI features.
          </p>
        </div>

        <div className="metric-grid">
          <article className="metric-card">
            <strong>12x</strong>
            <h3>Faster first drafts</h3>
            <p>Teams start with structured outputs instead of blank pages.</p>
          </article>
          <article className="metric-card">
            <strong>38%</strong>
            <h3>Lower manual triage</h3>
            <p>Routine routing and summarization happen automatically.</p>
          </article>
          <article className="metric-card">
            <strong>24/7</strong>
            <h3>Always-on support</h3>
            <p>Assistants stay available while sensitive cases move to people.</p>
          </article>
        </div>
      </section>

      <footer className="home-footer">
        <span>NeuralFlow AI Workspace</span>
        <span>Built for secure, human-centered automation.</span>
      </footer>
    </div>
  );
}

export default Home;
