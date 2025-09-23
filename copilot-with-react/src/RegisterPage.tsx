import React, { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on change
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { username: "", email: "", mobile: "", password: "", confirmPassword: "" };

    // Username validation
    if (!form.username || form.username.length < 8) {
      newErrors.username = "Username must be at least 8 characters long.";
      valid = false;
    }
    // Email validation
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }
    // Mobile validation
    if (!form.mobile || !/^\d{10,15}$/.test(form.mobile)) {
      newErrors.mobile = "Please enter a valid mobile number (10-15 digits).";
      valid = false;
    }
    // Password validation
    if (!form.password || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      valid = false;
    }
    // Confirm password validation
    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;
    // Handle registration logic here
  };

  const formStyle: React.CSSProperties = {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "32px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "18px"
  };
  const labelStyle: React.CSSProperties = {
    marginBottom: "6px",
    fontWeight: 500,
    color: "#333"
  };
  const inputStyle: React.CSSProperties = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
    marginBottom: "2px"
  };
  const buttonStyle: React.CSSProperties = {
    padding: "12px",
    borderRadius: "6px",
    background: "#007bff",
    color: "#fff",
    fontWeight: 600,
    fontSize: "1rem",
    border: "none",
    cursor: "pointer",
    marginTop: "10px"
  };

  return (
    <div style={{ background: "#f6f8fa", minHeight: "100vh", padding: "24px" }}>
      <h1 style={{ textAlign: "center", color: "#007bff", marginBottom: "24px" }}>Register Page</h1>
      <form onSubmit={handleSubmit} style={formStyle} noValidate>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="username" style={labelStyle}>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            style={inputStyle}
            minLength={8}
          />
          {errors.username && <span style={{ color: "#d32f2f", fontSize: "0.95em", marginTop: "2px" }}>{errors.username}</span>}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="email" style={labelStyle}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          {errors.email && <span style={{ color: "#d32f2f", fontSize: "0.95em", marginTop: "2px" }}>{errors.email}</span>}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="mobile" style={labelStyle}>Mobile Number:</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            required
            style={inputStyle}
            pattern="[0-9]{10,15}"
            placeholder="e.g. 1234567890"
          />
          {errors.mobile && <span style={{ color: "#d32f2f", fontSize: "0.95em", marginTop: "2px" }}>{errors.mobile}</span>}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="password" style={labelStyle}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={inputStyle}
            minLength={6}
          />
          {errors.password && <span style={{ color: "#d32f2f", fontSize: "0.95em", marginTop: "2px" }}>{errors.password}</span>}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="confirmPassword" style={labelStyle}>Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          {errors.confirmPassword && <span style={{ color: "#d32f2f", fontSize: "0.95em", marginTop: "2px" }}>{errors.confirmPassword}</span>}
        </div>
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
    </div>
  );
}
