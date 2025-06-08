import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Adjust path as needed
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
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
      await login({
        email: formData.email,
        password: formData.password,
      });

      navigate("/"); // redirect on success
    } catch (error) {
      setErrors({ general: `Error: ${error.message}` });
    }
  };

  return (
    <div id="login" className="auth screen">
      <div className="card auth-card">
        <div className="card-header">
          <h1>Login</h1>
        </div>
        <form className="card-body" onSubmit={handleSubmit} noValidate>
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
            <div className="field-group">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="form-checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span>Remember me</span>
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
          Don't have an account?{" "}
          <a className="auth-link" href="/register">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
