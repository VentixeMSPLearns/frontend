import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Adjust path as needed
import { useNavigate } from "react-router-dom";
const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        acceptTerms: formData.acceptTerms,
      });

      window.alert("Registration successful! Please log in.");

      navigate("/login"); // redirect on success
    } catch (error) {
      setErrors({ general: `Error: ${error.message}` });
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/; // 6+ chars with required types
    const usernameRegex = /^[a-zA-Z0-9._-]+$/; // Adjust to match Identity's exact config

    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    } else if (!usernameRegex.test(formData.username)) {
      newErrors.username =
        "Username can only contain letters, numbers, dots, underscores, and hyphens.";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email format is invalid.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must include uppercase, lowercase, number, and special character.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions.";
    }

    return newErrors;
  };

  return (
    <div id="register" className="auth screen">
      <div className="card auth-card">
        <div className="card-header">
          <h1>Register</h1>
        </div>

        <form className="card-body" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <div className="field-group">
              <input
                id="username"
                name="username"
                type="text"
                className={`form-control ${
                  errors.username ? "invalid-input" : ""
                }`}
                value={formData.username}
                onChange={handleChange}
                required
              />
              {errors.username && (
                <span className="field-validation-error">
                  {errors.username}
                </span>
              )}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="field-group">
              <input
                id="email"
                name="email"
                type="email"
                className={`form-control ${
                  errors.email ? "invalid-input" : ""
                }`}
                value={formData?.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <span className="field-validation-error">{errors.email}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="field-group">
              <input
                id="password"
                name="password"
                type="password"
                className={`form-control ${
                  errors.password ? "invalid-input" : ""
                }`}
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && (
                <span className="field-validation-error">
                  {errors.password}
                </span>
              )}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <div className="field-group">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className={`form-control ${
                  errors.confirmPassword ? "invalid-input" : ""
                }`}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && (
                <span className="field-validation-error">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <div className="field-group">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                className="form-checkbox"
                checked={formData.acceptTerms}
                onChange={handleChange}
              />
              <span>I accept the terms and conditions</span>
            </div>
          </div>

          {errors.general && (
            <div className="form-group">
              <span className="field-validation-error">{errors.general}</span>
            </div>
          )}

          <button className="btn btn-primary" type="submit">
            Log in
          </button>
        </form>
        <div className="card-footer">
          Already have an account?{" "}
          <a className="auth-link" href="/login">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
