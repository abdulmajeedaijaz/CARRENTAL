// Login.jsx (or app/login/page.jsx in Next.js App Router)
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverMsg, setServerMsg] = useState("");

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Min 6 characters";
    return e;
  };

  const handleChange = (ev) => {
    const { name, value, type, checked } = ev.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setServerMsg("");
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    try {
      setSubmitting(true);
      // TODO: replace with your API call
      await new Promise((r) => setTimeout(r, 900)); // mock request
      setServerMsg("Logged in successfully ✅");
      // navigate after success (e.g., window.location.href = "/dashboard")
    } catch (err) {
      setServerMsg("Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.card} noValidate>
        <h1 style={styles.title}>Welcome back</h1>
        <p style={styles.subtitle}>Sign in to continue</p>

        <label style={styles.label}>
          Email
          <input
            style={{ ...styles.input, ...(errors.email ? styles.inputError : {}) }}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
          />
          {errors.email && <span style={styles.error}>{errors.email}</span>}
        </label>

        <label style={styles.label}>
          Password
          <div style={styles.passwordWrap}>
            <input
              style={{
                ...styles.input,
                ...(errors.password ? styles.inputError : {}),
                paddingRight: 84,
              }}
              type={showPw ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              style={styles.eyeBtn}
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <span style={styles.error}>{errors.password}</span>}
        </label>

        <div style={styles.row}>
          <label style={styles.checkbox}>
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
            />
            <span>Remember me</span>
          </label>
          <a href="#" style={styles.link} onClick={(e) => e.preventDefault()}>
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          style={{
            ...styles.button,
            ...(submitting ? styles.buttonDisabled : {}),
          }}
          disabled={submitting}
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>

        {serverMsg && (
          <div
            style={{
              marginTop: 14,
              fontSize: 14,
              color: serverMsg.includes("successfully") ? "#0a7f2e" : "#b00020",
              textAlign: "center",
            }}
            role="status"
          >
            {serverMsg}
          </div>
        )}

        <p style={{ marginTop: 18, fontSize: 14, textAlign: "center", color: "#6b7280" }}>
          Don’t have an account?{" "}
          <a href="#" style={styles.link} onClick={(e) => e.preventDefault()}>
            Create one
          </a>
        </p>
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100dvh",
    display: "grid",
    placeItems: "center",
    background:
      "radial-gradient(1200px 600px at 10% -10%, #f0f9ff 10%, transparent 60%), radial-gradient(1200px 600px at 110% 110%, #eef2ff 10%, transparent 60%), #0b1220",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "#ffffff",
    borderRadius: 20,
    padding: 28,
    boxShadow: "0 10px 30px rgba(0,0,0,.12)",
  },
  title: { margin: 0, fontSize: 26, fontWeight: 700, color: "#0f172a" },
  subtitle: { marginTop: 6, marginBottom: 18, color: "#6b7280", fontSize: 14 },
  label: { display: "block", fontSize: 14, color: "#111827", marginTop: 12 },
  input: {
    width: "100%",
    marginTop: 6,
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    outline: "none",
    fontSize: 14,
  },
  inputError: { borderColor: "#b00020", background: "#fff6f6" },
  error: { color: "#b00020", fontSize: 12, marginTop: 6, display: "block" },
  passwordWrap: { position: "relative" },
  eyeBtn: {
    position: "absolute",
    right: 6,
    top: 6,
    height: 36,
    padding: "0 12px",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
    cursor: "pointer",
    fontSize: 12,
  },
  row: {
    marginTop: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkbox: { display: "flex", gap: 8, alignItems: "center", color: "#374151" },
  link: { color: "#2563eb", textDecoration: "none" },
  button: {
    width: "100%",
    marginTop: 16,
    padding: "12px 16px",
    borderRadius: 12,
    border: "none",
    background:
      "linear-gradient(135deg, rgba(37,99,235,1) 0%, rgba(99,102,241,1) 100%)",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },
  buttonDisabled: { opacity: 0.7, cursor: "not-allowed" },
};
