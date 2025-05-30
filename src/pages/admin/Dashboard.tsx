// src/pages/admin/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { FaHome, FaUsers, FaEdit } from "react-icons/fa";
import { db } from "@database/schema";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin" | "superadmin";
  createdAt: string;
}

const AdminDashboard = () => {
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    admins: 0,
    superadmins: 0,
  });

  useEffect(() => {
    // Fetch recent users (last 5 registered)
    const users = db.getAllUsers().slice(0, 5);
    setRecentUsers(users);

    // Fetch user statistics
    const stats = db.getUserStats();
    setUserStats(stats);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="container-fluid">
      {/* ... other dashboard sections ... */}

      {/* Users Section */}
      <div className="row">
        <div className="col-lg-6 mb-4">
          <TableCard
            title="New Users"
            viewAllLink="/admin/users"
            addNewLink="/admin/users/add"
            headers={["Name", "Email", "Role", "Joined", "Actions"]}
            data={recentUsers.map((user) => ({
              cells: [
                `${user.firstName} ${user.lastName}`,
                user.email,
                <span
                  className={`badge ${
                    user.role === "superadmin"
                      ? "bg-danger"
                      : user.role === "admin"
                      ? "bg-warning"
                      : "bg-primary"
                  }`}
                >
                  {user.role}
                </span>,
                formatDate(user.createdAt),
                <a
                  href={`/admin/users/edit/${user.id}`}
                  className="btn btn-sm btn-primary"
                >
                  <FaEdit />
                </a>,
              ],
            }))}
            emptyMessage="No users available"
            icon={<FaUsers />}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
