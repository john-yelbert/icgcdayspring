import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/ICGC_logo.png";

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Password validation
    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password: string) => {
    const errors: string[] = [];
    if (password.length < 8) errors.push("At least 8 characters");
    if (!/(?=.*[a-z])/.test(password)) errors.push("One lowercase letter");
    if (!/(?=.*[A-Z])/.test(password)) errors.push("One uppercase letter");
    if (!/(?=.*\d)/.test(password)) errors.push("One number");
    if (!/(?=.*[@$!%*?&])/.test(password)) errors.push("One special character");

    setPasswordErrors(errors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (!formData.agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Sign up attempt:", formData);
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialSignUp = (provider: string) => {
    console.log(`Sign up with ${provider}`);
    // Implement social sign up logic here
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
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
                  <h2 className="text-primary fw-bold mb-2">
                    Join Our Community
                  </h2>
                  <p className="text-muted">
                    Create your account to get started
                  </p>
                </div>

                {/* Social Sign Up Buttons */}
                <div className="mb-4">
                  <button
                    type="button"
                    className="btn btn-outline-danger w-100 mb-2 d-flex align-items-center justify-content-center"
                    onClick={() => handleSocialSignUp("google")}
                    style={{ borderRadius: "25px", height: "45px" }}
                  >
                    <i className="fab fa-google me-2"></i>
                    Sign up with Google
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                    onClick={() => handleSocialSignUp("facebook")}
                    style={{ borderRadius: "25px", height: "45px" }}
                  >
                    <i className="fab fa-facebook-f me-2"></i>
                    Sign up with Facebook
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

                {/* Sign Up Form */}
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label
                        htmlFor="firstName"
                        className="form-label fw-semibold"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter first name"
                        style={{ borderRadius: "10px", height: "45px" }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="lastName"
                        className="form-label fw-semibold"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter last name"
                        style={{ borderRadius: "10px", height: "45px" }}
                      />
                    </div>
                  </div>

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
                      placeholder="Enter your email"
                      style={{ borderRadius: "10px", height: "45px" }}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label fw-semibold">
                      Phone Number{" "}
                      <span className="text-muted">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
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
                        className={`form-control ${
                          passwordErrors.length > 0 && formData.password
                            ? "is-invalid"
                            : ""
                        }`}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        placeholder="Create a password"
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
                        style={{ border: "none", background: "none" }}
                      >
                        <i
                          className={`fas fa-eye${
                            showPassword ? "-slash" : ""
                          }`}
                        ></i>
                      </button>
                    </div>
                    {passwordErrors.length > 0 && formData.password && (
                      <div className="invalid-feedback d-block">
                        <small>
                          Password must include: {passwordErrors.join(", ")}
                        </small>
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="confirmPassword"
                      className="form-label fw-semibold"
                    >
                      Confirm Password
                    </label>
                    <div className="position-relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className={`form-control ${
                          formData.confirmPassword &&
                          formData.password !== formData.confirmPassword
                            ? "is-invalid"
                            : ""
                        }`}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        placeholder="Confirm your password"
                        style={{
                          borderRadius: "10px",
                          height: "45px",
                          paddingRight: "45px",
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        style={{ border: "none", background: "none" }}
                      >
                        <i
                          className={`fas fa-eye${
                            showConfirmPassword ? "-slash" : ""
                          }`}
                        ></i>
                      </button>
                    </div>
                    {formData.confirmPassword &&
                      formData.password !== formData.confirmPassword && (
                        <div className="invalid-feedback d-block">
                          <small>Passwords do not match</small>
                        </div>
                      )}
                  </div>

                  <div className="mb-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        required
                      />
                      <label
                        className="form-check-label text-muted small"
                        htmlFor="agreeToTerms"
                      >
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-primary text-decoration-none"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-primary text-decoration-none"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      passwordErrors.length > 0 ||
                      !formData.agreeToTerms
                    }
                    className="btn btn-primary w-100 fw-semibold"
                    style={{ borderRadius: "25px", height: "50px" }}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                {/* Sign In Link */}
                <div className="text-center mt-4">
                  <p className="mb-0 text-muted">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-primary fw-semibold text-decoration-none"
                    >
                      Sign in here
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

export default SignUpPage;
