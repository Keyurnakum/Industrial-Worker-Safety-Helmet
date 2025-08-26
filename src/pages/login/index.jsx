import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import SystemStats from './components/SystemStats';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('safetyUser');
    if (savedUser) {
      navigate('/real-time-safety-dashboard');
    }
  }, [navigate]);

  const handleLogin = (userInfo) => {
    console.log('User logged in:', userInfo);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SH</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">SafetyHelmet Monitor</h1>
                <p className="text-xs text-muted-foreground">Industrial IoT Safety System</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-subtle"></div>
              <span>System Online</span>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-8rem)]">
          {/* Left Sidebar - Trust Signals (Desktop) */}
          <div className="hidden lg:block lg:col-span-3">
            <TrustSignals />
          </div>

          {/* Center - Login Form */}
          <div className="col-span-1 lg:col-span-6 flex items-center justify-center">
            <div className="w-full max-w-md">
              <LoginForm onLogin={handleLogin} />
              
              {/* Mobile Trust Signals */}
              <div className="lg:hidden mt-8">
                <TrustSignals />
              </div>
            </div>
          </div>

          {/* Right Sidebar - System Stats (Desktop) */}
          <div className="hidden lg:block lg:col-span-3">
            <SystemStats />
          </div>
        </div>

        {/* Mobile System Stats */}
        <div className="lg:hidden mt-8">
          <SystemStats />
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} SafetyHelmet Monitor. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Protecting industrial workers through advanced IoT monitoring
              </p>
            </div>
            <div className="flex items-center space-x-6 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;