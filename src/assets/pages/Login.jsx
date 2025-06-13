import { useState, useContext } from "react";
import { useAuth } from "../context/AuthContext"; // Adjust path as needed
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../context/LoadingContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);

  const [formData, setFormData] = useState({
    username: "",
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

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      await login({
        username: formData.username,
        password: formData.password,
      });

      navigate("/"); // redirect on success
    } catch (error) {
      setErrors({ general: `Error: ${error.message}` });
    } finally {
      setLoading(false);
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
                value={formData?.username}
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
