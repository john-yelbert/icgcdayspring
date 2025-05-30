import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "/ICGC_logo.png";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { login, loginWithSocial, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination or default to home
  const from = location.state?.from?.pathname || "/";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await login(formData.email, formData.password);

    if (result.success) {
      // Redirect to intended page or home
      navigate(from, { replace: true });
    } else {
      setError(result.error || "Login failed");
    }
  };

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    setError("");
    const result = await loginWithSocial(provider);

    if (!result.success) {
      setError(result.error || "Social login failed");
    }
    // For social login, the redirect happens automatically
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div
              className="card shadow-lg border-0"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body p-5">
                {/* Logo and Header */}
                <div className="text-center mb-4">
                  <img
                    src={logo}
                    alt="ICGC Logo"
                    height="60"
                    className="mb-3"
                  />
                  <h2 className="text-primary fw-bold mb-2">Welcome Back</h2>
                  <p className="text-muted">Sign in to your account</p>
                </div>

                {/* Error Alert */}
                {error && (
                  <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                  >
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setError("")}
                    ></button>
                  </div>
                )}

                {/* Social Login Buttons */}
                <div className="mb-4">
                  <button
                    type="button"
                    className="btn btn-outline-danger w-100 mb-2 d-flex align-items-center justify-content-center"
                    onClick={() => handleSocialLogin("google")}
                    disabled={isLoading}
                    style={{ borderRadius: "25px", height: "45px" }}
                  >
                    <i className="fab fa-google me-2"></i>
                    Continue with Google
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                    onClick={() => handleSocialLogin("facebook")}
                    disabled={isLoading}
                    style={{ borderRadius: "25px", height: "45px" }}
                  >
                    <i className="fab fa-facebook-f me-2"></i>
                    Continue with Facebook
                  </button>
                </div>

                {/* Divider */}
                <div className="text-center mb-4">
                  <div className="d-flex align-items-center">
                    <hr className="flex-grow-1" />
                    <span className="px-3 text-muted small">OR</span>
                    <hr className="flex-grow-1" />
                  </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      placeholder="Enter your email"
                      style={{ borderRadius: "10px", height: "45px" }}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label fw-semibold"
                    >
                      Password
                    </label>
                    <div className="position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        placeholder="Enter your password"
                        style={{
                          borderRadius: "10px",
                          height: "45px",
                          paddingRight: "45px",
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                        style={{ border: "none", background: "none" }}
                      >
                        <i
                          className={`fas fa-eye${
                            showPassword ? "-slash" : ""
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>

                  <div className="mb-3 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                      <label
                        className="form-check-label text-muted small"
                        htmlFor="rememberMe"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-primary small text-decoration-none"
                      style={{ fontWeight: "500" }}
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary w-100 fw-semibold"
                    style={{ borderRadius: "25px", height: "50px" }}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                {/* Sign Up Link */}
                <div className="text-center mt-4">
                  <p className="mb-0 text-muted">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-primary fw-semibold text-decoration-none"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
