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
    setErrors({});

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        acceptTerms: formData.acceptTerms,
      });

      navigate("/"); // redirect on success
    } catch (error) {
      setErrors({ general: `Error: ${error.message}` });
    }
  };

  return (
    <div id="register" className="auth screen">
      <div className="card auth-card">
        <div className="card-header">
          <h1>Register</h1>
        </div>

        <form className="card-body" onSubmit={handleSubmit} novalidate>
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
