import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopHeader from '../../components/ui/TopHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import KPICard from './components/KPICard';
import InteractiveSiteMap from './components/InteractiveSiteMap';
import RealTimeAlertsFeed from './components/RealTimeAlertsFeed';
import WorkerStatusTable from './components/WorkerStatusTable';
import EnvironmentalSensorChart from './components/EnvironmentalSensorChart';

const RealTimeSafetyDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalWorkers: 24,
    complianceRate: 87.5,
    activeAlerts: 3,
    environmentalStatus: 'normal'
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        complianceRate: Math.max(75, Math.min(100, prev?.complianceRate + (Math.random() - 0.5) * 2)),
        activeAlerts: Math.max(0, Math.min(10, prev?.activeAlerts + Math.floor((Math.random() - 0.5) * 3)))
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSiteChange = (site) => {
    console.log('Site changed to:', site);
    // Handle site change logic here
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
    // Handle profile navigation
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleNotificationClick = () => {
    navigate('/safety-alerts-incidents');
  };

  const handleKPIClick = (kpiType) => {
    switch (kpiType) {
      case 'workers': navigate('/worker-management');
        break;
      case 'alerts': navigate('/safety-alerts-incidents');
        break;
      case 'environment': navigate('/environmental-monitoring');
        break;
      default:
        break;
    }
  };

  const getEnvironmentalStatus = () => {
    switch (dashboardData?.environmentalStatus) {
      case 'critical':
        return 'critical';
      case 'warning':
        return 'warning';
      case 'normal':
        return 'success';
      default:
        return 'normal';
    }
  };

  const getComplianceStatus = () => {
    if (dashboardData?.complianceRate >= 95) return 'success';
    if (dashboardData?.complianceRate >= 85) return 'warning';
    return 'critical';
  };

  const getAlertsStatus = () => {
    if (dashboardData?.activeAlerts === 0) return 'success';
    if (dashboardData?.activeAlerts <= 2) return 'warning';
    return 'critical';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <TopHeader
        onSiteChange={handleSiteChange}
        onProfileClick={handleProfileClick}
        onLogout={handleLogout}
        onNotificationClick={handleNotificationClick}
        alertCount={dashboardData?.activeAlerts}
      />
      {/* Sidebar Navigation */}
      <SidebarNavigation
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      {/* Main Content */}
      <main className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'
      } pt-16`}>
        <div className="p-6 space-y-6">
          {/* Breadcrumb */}
          <BreadcrumbTrail />

          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Real-Time Safety Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Monitor worker safety compliance and environmental conditions across all sites
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-subtle"></div>
              <span>Live Data</span>
              <span>•</span>
              <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="Total Workers"
              value={dashboardData?.totalWorkers}
              icon="Users"
              status="normal"
              onClick={() => handleKPIClick('workers')}
            />
            <KPICard
              title="Compliance Rate"
              value={dashboardData?.complianceRate?.toFixed(1)}
              unit="%"
              icon="Shield"
              status={getComplianceStatus()}
              trend={2.3}
              onClick={() => handleKPIClick('compliance')}
            />
            <KPICard
              title="Active Alerts"
              value={dashboardData?.activeAlerts}
              icon="AlertTriangle"
              status={getAlertsStatus()}
              trend={dashboardData?.activeAlerts > 2 ? 15 : -8}
              onClick={() => handleKPIClick('alerts')}
            />
            <KPICard
              title="Environment"
              value="Normal"
              icon="Thermometer"
              status={getEnvironmentalStatus()}
              onClick={() => handleKPIClick('environment')}
            />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Interactive Site Map */}
            <div className="xl:col-span-2">
              <InteractiveSiteMap />
            </div>

            {/* Real-Time Alerts Feed */}
            <div className="xl:col-span-1">
              <RealTimeAlertsFeed />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Worker Status Table */}
            <div className="xl:col-span-1">
              <WorkerStatusTable />
            </div>

            {/* Environmental Sensor Chart */}
            <div className="xl:col-span-1">
              <EnvironmentalSensorChart />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => navigate('/worker-management')}
                className="p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors text-center"
              >
                <div className="text-2xl mb-2">👥</div>
                <div className="text-sm font-medium text-foreground">Manage Workers</div>
              </button>
              <button
                onClick={() => navigate('/safety-alerts-incidents')}
                className="p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors text-center"
              >
                <div className="text-2xl mb-2">🚨</div>
                <div className="text-sm font-medium text-foreground">View Incidents</div>
              </button>
              <button
                onClick={() => navigate('/environmental-monitoring')}
                className="p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors text-center"
              >
                <div className="text-2xl mb-2">🌡️</div>
                <div className="text-sm font-medium text-foreground">Environment</div>
              </button>
              <button
                onClick={() => navigate('/safety-reports-analytics')}
                className="p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors text-center"
              >
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm font-medium text-foreground">Reports</div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RealTimeSafetyDashboard;