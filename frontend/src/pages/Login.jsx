import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Alert,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { AutoAwesome, ShieldOutlined, TrendingUp } from "@mui/icons-material";

import { loginUser } from "../services/api";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(location.state?.message ?? "");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await loginUser({ email, password });
      const loggedInUser = response.data.user;

      localStorage.setItem("authUser", JSON.stringify(loggedInUser));
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message ?? "Unable to login. Make sure the backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-shell">
      <div className="auth-showcase">
        <div className="brand-mark">
          <span className="brand-icon">AI</span>
          NeuralFlow
        </div>

        <div className="auth-copy">
          <span className="eyebrow light">
            <AutoAwesome fontSize="small" />
            Secure AI workspace
          </span>
          <h1>Welcome back to your AI workspace.</h1>
          <p>
            Sign in to manage intelligent workflows, model-powered decisions, and human review
            loops from one polished command center.
          </p>
        </div>

        <div className="showcase-grid">
          <div className="showcase-tile">
            <strong>48k</strong>
            <span>signals analyzed</span>
          </div>
          <div className="showcase-tile">
            <strong>98%</strong>
            <span>uptime target</span>
          </div>
          <div className="showcase-tile">
            <strong>27</strong>
            <span>live automations</span>
          </div>
        </div>

        <div className="auth-insight">
          <ShieldOutlined />
          <div>
            <strong>Protected access</strong>
            <span>Accounts are stored with encrypted password hashes and MongoDB-backed identity.</span>
          </div>
          <TrendingUp />
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-card">
          <h2>Login</h2>
          <p className="auth-subtitle">Use your account to continue to the AI home page.</p>

          {message && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form className="auth-form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              required
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              required
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              className="auth-submit"
              fullWidth
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={22} color="inherit" /> : "Login"}
            </Button>
          </form>

          <p className="auth-switch">
            Don&apos;t have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
