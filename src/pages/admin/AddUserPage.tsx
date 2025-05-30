// src/pages/admin/AddUserPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../database/schema";
import { v4 as uuidv4 } from "uuid";

const AddUserPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "user" as "user" | "admin" | "superadmin",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    db.createUser({
      id: uuidv4(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      password: user.password, // Note: In production, hash this password!
    });
    navigate("/admin/users");
  };

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Add New User</h1>
      </div>

      <div className="card shadow mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={user.firstName}
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={user.lastName}
                    onChange={(e) =>
                      setUser({ ...user, lastName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
                minLength={8}
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select
                className="form-control"
                value={user.role}
                onChange={(e) =>
                  setUser({
                    ...user,
                    role: e.target.value as "user" | "admin" | "superadmin",
                  })
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Create User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserPage;
