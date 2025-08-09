import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { MetaMaskProvider, useMetaMask } from 'metamask-react';

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
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(status === "connected" && account);
  }, [status, account]);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar isConnected={isConnected} account={account} />
        <main>
          <Routes>
            {/* Always accessible routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/education" element={<EducationPage />} />

            {/* MetaMask Protected Routes */}
            {isConnected ? (
              <>
                <Route path="/dashboard" element={<DashboardPage account={account} />} />
                <Route path="/results" element={<ResultsPage account={account} />} />
                <Route path="/trader-profile" element={<TraderProfilePage account={account} />} />
                <Route path="/payment" element={<PaymentPage account={account} />} />
                <Route path="/profile" element={<ProfilePage account={account} />} />
              </>
            ) : (
              // Redirect to home if MetaMask not connected
              <Route path="*" element={<LandingPage />} />
            )}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <MetaMaskProvider>
      <AppContent />
    </MetaMaskProvider>
  );
}

export default App;
