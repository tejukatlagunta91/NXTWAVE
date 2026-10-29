import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import TargetAudience from './components/TargetAudience.jsx';
import Benefits from './components/Benefits.jsx';
import RegistrationForm from './components/RegistrationForm.jsx';
import RegistrationSuccessModal from './components/RegistrationSuccessModal.jsx';
import AdminLoginModal from './components/AdminLoginModal.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import DemoModeBanner from './components/DemoModeBanner.jsx';
import Footer from './components/Footer.jsx';
import api from './services/api.js';

export function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'admin'
  const [adminToken, setAdminToken] = useState(() => sessionStorage.getItem('nxtwave_admin_token') || null);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [registrationSuccessData, setRegistrationSuccessData] = useState(null);

  // Campaign State (derived directly from localStorage)
  const [campaignStats, setCampaignStats] = useState(null);

  // URL Parameters for Source Attribution and Referral Tracking
  const [trackedSource, setTrackedSource] = useState('whatsapp');
  const [trackedReferral, setTrackedReferral] = useState('');

  // 1. Parse URL Query Parameters on Page Load
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlSource = urlParams.get('source');
      const urlRef = urlParams.get('ref');

      const validSources = ['whatsapp', 'referral', 'college_club', 'linkedin', 'faculty'];
      
      let selectedSource = 'whatsapp';
      if (urlSource && validSources.includes(urlSource.toLowerCase())) {
        selectedSource = urlSource.toLowerCase();
      } else if (urlRef) {
        selectedSource = 'referral';
      }

      setTrackedSource(selectedSource);
      if (urlRef) {
        setTrackedReferral(urlRef.trim().toUpperCase());
      }

      // Record observed visit in this browser for conversion funnel tracking
      api.trackVisit(selectedSource, urlRef ? urlRef.trim().toUpperCase() : null);
    } catch (err) {
      console.warn('URL parsing error:', err);
    }
  }, []);

  // 2. Fetch campaign stats from localStorage
  const refreshCampaignStats = async () => {
    try {
      const res = await api.getCampaignStats();
      if (res.success) {
        setCampaignStats(res.data);
      }
    } catch (err) {
      console.warn('Failed to fetch campaign stats:', err);
    }
  };

  useEffect(() => {
    refreshCampaignStats();
  }, []);

  // Admin authentication handlers
  const handleAdminLoginSuccess = (token) => {
    sessionStorage.setItem('nxtwave_admin_token', token);
    setAdminToken(token);
    setCurrentView('admin');
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('nxtwave_admin_token');
    setAdminToken(null);
    setCurrentView('landing');
  };

  const handleOpenAdmin = () => {
    if (adminToken) {
      setCurrentView('admin');
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const genuineCount = campaignStats?.summary?.genuineCount || 0;
  const targetGoal = campaignStats?.campaign?.goal || 500;
  const progressPercent = campaignStats?.summary?.progressPercent || 0;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Local Prototype Transparency Banner */}
      <DemoModeBanner />

      {/* Global Navigation */}
      <Navbar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        genuineCount={genuineCount}
        targetGoal={targetGoal}
        onOpenAdminLogin={handleOpenAdmin}
      />

      {/* Main Content Area */}
      <main style={{ flexGrow: 1 }}>
        {currentView === 'landing' ? (
          <>
            <Hero 
              genuineCount={genuineCount}
              targetGoal={targetGoal}
              progressPercent={progressPercent}
            />

            <TargetAudience />

            <Benefits />

            <RegistrationForm 
              initialSource={trackedSource}
              initialReferral={trackedReferral}
              onRegistrationSuccess={(data) => {
                setRegistrationSuccessData(data);
                refreshCampaignStats();
              }}
            />
          </>
        ) : (
          <AdminDashboard 
            token={adminToken}
            onLogout={handleAdminLogout}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onOpenAdminLogin={handleOpenAdmin} />

      {/* Registration Success Modal with Referral Code and WhatsApp Share */}
      {registrationSuccessData && (
        <RegistrationSuccessModal 
          registrationData={registrationSuccessData}
          onClose={() => setRegistrationSuccessData(null)}
        />
      )}

      {/* Admin Login Modal */}
      <AdminLoginModal 
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

    </div>
  );
}

export default App;
