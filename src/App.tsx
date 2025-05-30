import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Sermons from "./pages/Sermons";
import Events from "./pages/Events";
import Giving from "./pages/Giving";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import ManageSermons from "./pages/admin/ManageSermons";
import ManageUsers from "./pages/admin/ManageUsers";

// Role constants for type safety
const ROLES = {
  ADMIN: "admin",
  SUPERADMIN: "superadmin",
} as const;

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <main className="container py-4">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sermons" element={<Sermons />} />
            <Route path="/events" element={<Events />} />
            <Route path="/giving" element={<Giving />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin routes group */}
            <Route path="/admin">
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute
                    allowedRoles={[ROLES.ADMIN, ROLES.SUPERADMIN]}
                  >
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="events"
                element={
                  <ProtectedRoute
                    allowedRoles={[ROLES.ADMIN, ROLES.SUPERADMIN]}
                  >
                    <ManageEvents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="sermons"
                element={
                  <ProtectedRoute
                    allowedRoles={[ROLES.ADMIN, ROLES.SUPERADMIN]}
                  >
                    <ManageSermons />
                  </ProtectedRoute>
                }
              />
              <Route
                path="users"
                element={
                  <ProtectedRoute allowedRoles={[ROLES.SUPERADMIN]}>
                    <ManageUsers />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
