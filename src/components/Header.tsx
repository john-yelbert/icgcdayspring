import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "/ICGC_logo.png";

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    // Optionally redirect to home page
    // navigate('/');
  };

  const getInitials = (firstName: string, lastName: string) => {
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div className="church-logo me-2">
            <img
              src={logo}
              alt="Church Logo"
              className="logo-img"
              height={40}
            />
          </div>
          <span>ICGC DAYSPRING ASSEMBLY</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sermons">
                Sermons
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/events">
                Events
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About Us
              </NavLink>
            </li>
            {/* Show admin links for authenticated users with admin role */}
            {isAuthenticated && user?.role === "admin" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Admin
                </NavLink>
              </li>
            )}
          </ul>

          <ul className="navbar-nav">
            {isAuthenticated && user ? (
              <li className="nav-item dropdown" ref={dropdownRef}>
                <button
                  className="nav-link dropdown-toggle d-flex align-items-center btn btn-link text-white border-0 bg-transparent"
                  type="button"
                  onClick={toggleDropdown}
                  aria-expanded={dropdownOpen}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="avatar-circle me-2 d-flex align-items-center justify-content-center"
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "50%",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Avatar"
                        className="rounded-circle"
                        width="32"
                        height="32"
                      />
                    ) : (
                      getInitials(user.firstName, user.lastName)
                    )}
                  </div>
                  <span className="d-none d-md-inline">
                    {user.firstName} {user.lastName}
                  </span>
                </button>
                <ul
                  className={`dropdown-menu dropdown-menu-end ${
                    dropdownOpen ? "show" : ""
                  }`}
                >
                  <li>
                    <div className="dropdown-header">
                      <small className="text-muted">{user.email}</small>
                    </div>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <i className="fas fa-user me-2" />
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/settings"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <i className="fas fa-cog me-2" />
                      Settings
                    </Link>
                  </li>
                  {user.role === "admin" && (
                    <>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/admin/dashboard"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <i className="fas fa-tachometer-alt me-2" />
                          Admin Dashboard
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt me-2" />
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item me-2">
                  <Link
                    className="btn btn-outline-light px-3"
                    to="/login"
                    style={{
                      borderRadius: "20px",
                      textDecoration: "none",
                      color: "white !important",
                      borderColor: "white",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "white";
                    }}
                  >
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="btn btn-light px-3"
                    to="/signup"
                    style={{
                      borderRadius: "20px",
                      textDecoration: "none",
                      color: "#0d6efd",
                      fontWeight: "500",
                    }}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
