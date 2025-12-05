import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import EnquiryPage from "./pages/EnquiryPage.jsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* NAVBAR */}
      <header className="bg-white shadow">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-orange-600">
            MetaUlagam
          </Link>

          <div className="flex gap-6 text-sm sm:text-base">
            <Link to="/" className="hover:text-orange-600">
              Home
            </Link>
            <Link to="/courses" className="hover:text-orange-600">
              Courses
            </Link>
            <Link to="/enquiry" className="hover:text-orange-600">
              Enquiry
            </Link>
            <Link to="/login" className="hover:text-orange-600">
              Login
            </Link>
            <Link to="/admin" className="hover:text-orange-600 font-semibold">
              Admin
            </Link>
          </div>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/enquiry" element={<EnquiryPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 text-center text-sm py-3 mt-4">
        © {new Date().getFullYear()} MetaUlagam – VR & Film Making Academy
      </footer>
    </div>
  );
}

export default App;
