import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { MetaMaskProvider, useMetaMask } from 'metamask-react';
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
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

function AppContent() {
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const [user, setUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(status === "connected" && account);
    
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (savedUser && token && status === "connected" && account) {
      setUser(JSON.parse(savedUser));
    }
  }, [status, account]);

  const handleUserChange = (newUser) => {
    setUser(newUser);
  };

  return (
    <div className="App">
      <Navbar onUserChange={handleUserChange} user={user} />
      
      <Routes>
        {/* Always accessible routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        
        {/* Authentication routes - accessible when user is NOT logged in */}
        <Route path="/register" element={<RegisterPage setUser={setUser} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />

        {/* Protected routes - only accessible when user is logged in AND wallet connected */}
        {user && isConnected ? (
          <>
            <Route path="/dashboard" element={<DashboardPage user={user} />} />
            <Route path="/learn" element={<EducationPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/profile" element={<ProfilePage user={user} />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/trader/:id" element={<TraderProfilePage />} />
          </>
        ) : null}
      </Routes>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <MetaMaskProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </MetaMaskProvider>
  );
}

export default App;
