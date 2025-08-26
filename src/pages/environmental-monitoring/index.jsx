import React, { useState, useEffect } from 'react';
import TopHeader from '../../components/ui/TopHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import EnvironmentalKPICard from './components/EnvironmentalKPICard';
import SensorChart from './components/SensorChart';
import SiteZoneSelector from './components/SiteZoneSelector';
import AlertThresholdPanel from './components/AlertThresholdPanel';
import EnvironmentalViolationsList from './components/EnvironmentalViolationsList';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const EnvironmentalMonitoring = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock environmental data
  const environmentalKPIs = [
    {
      title: 'Temperature',
      value: 28.5,
      unit: '°C',
      threshold: 35,
      status: 'safe',
      trend: 'up',
      trendValue: '+2.1°C',
      icon: 'Thermometer'
    },
    {
      title: 'Humidity',
      value: 62,
      unit: '%',
      threshold: 70,
      status: 'caution',
      trend: 'up',
      trendValue: '+5%',
      icon: 'Droplets'
    },
    {
      title: 'CO2 Level',
      value: 420,
      unit: 'ppm',
      threshold: 1000,
      status: 'safe',
      trend: 'stable',
      trendValue: '0 ppm',
      icon: 'Wind'
    },
    {
      title: 'Noise Level',
      value: 78,
      unit: 'dB',
      threshold: 85,
      status: 'safe',
      trend: 'down',
      trendValue: '-3 dB',
      icon: 'Volume2'
    }
  ];

  // Generate mock sensor data for charts
  const generateSensorData = (baseValue, variance = 5) => {
    const data = [];
    const now = new Date();
    
    for (let i = 23; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
      const value = baseValue + (Math.random() - 0.5) * variance * 2;
      data?.push({
        timestamp: timestamp?.getTime(),
        value: Math.round(value * 10) / 10
      });
    }
    return data;
  };

  const temperatureData = generateSensorData(28.5, 3);
  const humidityData = generateSensorData(62, 8);
  const co2Data = generateSensorData(420, 50);
  const noiseData = generateSensorData(78, 5);

  // Auto-refresh functionality
  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        setLastUpdated(new Date());
      }, 30000); // Refresh every 30 seconds
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleSiteChange = (siteId) => {
    console.log('Site changed:', siteId);
  };

  const handleZoneChange = (zoneId, siteId) => {
    console.log('Zone changed:', zoneId, 'in site:', siteId);
  };

  const handleThresholdUpdate = (type, values) => {
    console.log('Threshold updated:', type, values);
  };

  const handleViolationClick = (violation) => {
    console.log('Violation clicked:', violation);
  };

  const handleExportData = () => {
    alert('Environmental data exported successfully');
  };

  const handleEmergencyAlert = () => {
    alert('Emergency environmental alert triggered');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <TopHeader 
        currentUser={{ name: 'Environmental Manager', role: 'Manager' }}
        alertCount={2}
        onNotificationClick={() => console.log('Notifications clicked')}
      />
      {/* Sidebar Navigation */}
      <SidebarNavigation 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      {/* Main Content */}
      <main className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'
      } pt-16`}>
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-6">
            <BreadcrumbTrail />
            <div className="flex items-center justify-between mt-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Environmental Monitoring</h1>
                <p className="text-muted-foreground mt-1">
                  Real-time environmental sensor data and safety thresholds
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Auto Refresh Toggle */}
                <Button
                  variant={autoRefresh ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className="flex items-center space-x-2"
                >
                  <Icon name="RefreshCw" size={14} className={autoRefresh ? 'animate-spin' : ''} />
                  <span>Auto Refresh</span>
                </Button>
                
                {/* Emergency Alert Button */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleEmergencyAlert}
                  className="flex items-center space-x-2"
                >
                  <Icon name="AlertTriangle" size={14} />
                  <span>Emergency Alert</span>
                </Button>
                
                {/* Export Data Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportData}
                  className="flex items-center space-x-2"
                >
                  <Icon name="Download" size={14} />
                  <span>Export Data</span>
                </Button>
              </div>
            </div>
            
            {/* Last Updated Info */}
            <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>Last updated: {lastUpdated?.toLocaleTimeString('en-US', { hour12: false })}</span>
            </div>
          </div>

          {/* Environmental KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {environmentalKPIs?.map((kpi, index) => (
              <EnvironmentalKPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                unit={kpi?.unit}
                threshold={kpi?.threshold}
                status={kpi?.status}
                trend={kpi?.trend}
                trendValue={kpi?.trendValue}
                icon={kpi?.icon}
              />
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Left Panel - Site & Zone Selector */}
            <div className="xl:col-span-1">
              <SiteZoneSelector
                onSiteChange={handleSiteChange}
                onZoneChange={handleZoneChange}
                className="mb-6"
              />
            </div>

            {/* Center Panel - Charts */}
            <div className="xl:col-span-2 space-y-6">
              <SensorChart
                title="Temperature Monitoring"
                data={temperatureData}
                dataKey="value"
                color="var(--color-error)"
                unit="°C"
                threshold={35}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SensorChart
                  title="Humidity Levels"
                  data={humidityData}
                  dataKey="value"
                  color="var(--color-primary)"
                  unit="%"
                  threshold={70}
                />
                
                <SensorChart
                  title="CO2 Concentration"
                  data={co2Data}
                  dataKey="value"
                  color="var(--color-success)"
                  unit="ppm"
                  threshold={1000}
                />
              </div>
              
              <SensorChart
                title="Noise Level Monitoring"
                data={noiseData}
                dataKey="value"
                color="var(--color-warning)"
                unit="dB"
                threshold={85}
              />
            </div>

            {/* Right Panel - Thresholds & Violations */}
            <div className="xl:col-span-1 space-y-6">
              <AlertThresholdPanel
                onThresholdUpdate={handleThresholdUpdate}
              />
              
              <EnvironmentalViolationsList
                onViolationClick={handleViolationClick}
              />
            </div>
          </div>

          {/* Mobile-Optimized Bottom Section */}
          <div className="xl:hidden mt-8 space-y-6">
            <AlertThresholdPanel
              onThresholdUpdate={handleThresholdUpdate}
            />
            
            <EnvironmentalViolationsList
              onViolationClick={handleViolationClick}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnvironmentalMonitoring;