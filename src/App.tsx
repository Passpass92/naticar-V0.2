import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import SplashScreen from './components/SplashScreen';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import AuthModal from './components/auth/AuthModal';
import { useNavigationStore } from './stores/navigationStore';
import { useAuth } from './hooks/useAuth';
import MainContent from './components/MainContent';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { currentSection } = useNavigationStore();
  const { user, loading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      setShowAuthModal(true);
    }
  }, [loading, user]);

  if (showSplash) {
    return <SplashScreen />;
  }

  if (!user) {
    return (
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => {}} 
        onSuccess={() => setShowAuthModal(false)} 
      />
    );
  }

  if (!onboardingComplete) {
    return <OnboardingFlow onComplete={() => setOnboardingComplete(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex">
        <Navigation />
        <main className="flex-1">
          <MainContent currentSection={currentSection} />
        </main>
      </div>
    </div>
  );
}

export default App;