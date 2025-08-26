import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import WorkerManagement from './pages/worker-management';
import EnvironmentalMonitoring from './pages/environmental-monitoring';
import LoginPage from './pages/login';
import SafetyAlertsIncidents from './pages/safety-alerts-incidents';
import RealTimeSafetyDashboard from './pages/real-time-safety-dashboard';
import SafetyReportsAnalytics from './pages/safety-reports-analytics';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<EnvironmentalMonitoring />} />
        <Route path="/worker-management" element={<WorkerManagement />} />
        <Route path="/environmental-monitoring" element={<EnvironmentalMonitoring />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/safety-alerts-incidents" element={<SafetyAlertsIncidents />} />
        <Route path="/real-time-safety-dashboard" element={<RealTimeSafetyDashboard />} />
        <Route path="/safety-reports-analytics" element={<SafetyReportsAnalytics />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
