// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import EnquiryPage from "./pages/EnquiryPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";   // ✅ correct file name
import AdminPage from "./pages/AdminPage.jsx";   // ✅ correct file name

// Simple protected route wrapper
function RequireAdmin({ children }) {
  const token = localStorage.getItem("metaulagam_token"); // ✅ same key as LoginPage
  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/enquiry" element={<EnquiryPage />} />

      {/* Admin login page */}
      <Route path="/admin-login" element={<LoginPage />} />

      {/* Protected admin dashboard */}
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminPage />
          </RequireAdmin>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
