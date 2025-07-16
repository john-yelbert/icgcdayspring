import React, { useEffect, useState } from "react";
import { FaUsers, FaEdit } from "react-icons/fa";
import TableCard from "../../components/ui/TableCard";

console.log("AdminDashboard loaded");

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
    const fetchUsersAndStats = async () => {
      try {
        // Fetch users
        const usersRes = await fetch("http://localhost:3001/api/admin/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          credentials: "include",
        });
        const usersData: User[] = await usersRes.json();
        setRecentUsers(usersData.slice(0, 5)); // Keep only last 5

        // Fetch stats
        const statsRes = await fetch(
          "http://localhost:3001/api/admin/user-stats",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            credentials: "include",
          }
        );
        const statsData = await statsRes.json();
        setUserStats(statsData);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchUsersAndStats();
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
