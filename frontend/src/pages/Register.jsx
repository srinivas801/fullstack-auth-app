import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Alert,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";

import { registerUser } from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await registerUser({ name, email, password });

      navigate("/", {
        state: {
          message: response.data.message,
        },
      });
    } catch (err) {
      setError(err.response?.data?.message ?? "Unable to register. Make sure the backend is running.");
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
          <h1>Create your AI command account.</h1>
          <p>
            Join the workspace to unlock assistants, automation pipelines, analytics, and a secure
            home for your AI experiments.
          </p>
        </div>

        <div className="showcase-grid">
          <div className="showcase-tile">
            <strong>6</strong>
            <span>agent templates</span>
          </div>
          <div className="showcase-tile">
            <strong>3 min</strong>
            <span>setup time</span>
          </div>
          <div className="showcase-tile">
            <strong>24/7</strong>
            <span>AI availability</span>
          </div>
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-card">
          <h2>Register</h2>
          <p className="auth-subtitle">Create an account, then sign in to enter the home page.</p>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form className="auth-form" onSubmit={handleRegister}>
            <TextField
              fullWidth
              required
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
              helperText="Use at least 6 characters."
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
              {isSubmitting ? <CircularProgress size={22} color="inherit" /> : "Create account"}
            </Button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;
