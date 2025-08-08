import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PaymentPage from "./pages/PaymentPage";
import ResultsPage from "./pages/ResultsPage";
import TraderProfilePage from "./pages/TraderProfilePage";
import DashboardPage from "./pages/DashboardPage";
import EducationPage from "./pages/EducationPage";
import SupportPage from "./pages/SupportPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleSetUser = (userData) => {
    setUser(userData);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />
      <div style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/trader/:id" element={<TraderProfilePage />} />

          <Route path="/dashboard" element={
          <ProtectedRoute user={user}>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/learn" element={
            <ProtectedRoute user={user}>
              <EducationPage />
            </ProtectedRoute>
          } />
          <Route path="/support" element={
            <ProtectedRoute user={user}>
              <SupportPage />
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute user={user}>
              <AboutPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute user={user}>
              <ProfilePage user={user} setUser={handleSetUser} />
            </ProtectedRoute>
          } />

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
