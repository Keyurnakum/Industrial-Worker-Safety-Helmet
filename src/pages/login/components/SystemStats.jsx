import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemStats = () => {
  const [stats, setStats] = useState({
    activeSites: 24,
    connectedDevices: 1847,
    activeWorkers: 312,
    safetyAlerts: 3,
    uptime: 99.8
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate real-time stats updates
    const statsInterval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        connectedDevices: prev?.connectedDevices + Math.floor(Math.random() * 3) - 1,
        activeWorkers: Math.max(280, prev?.activeWorkers + Math.floor(Math.random() * 5) - 2),
        safetyAlerts: Math.max(0, prev?.safetyAlerts + Math.floor(Math.random() * 2) - 1)
      }));
    }, 8000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(statsInterval);
    };
  }, []);

  const statItems = [
    {
      label: 'Active Sites',
      value: stats?.activeSites,
      icon: 'Building2',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Connected Devices',
      value: stats?.connectedDevices?.toLocaleString(),
      icon: 'Smartphone',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Active Workers',
      value: stats?.activeWorkers,
      icon: 'Users',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Safety Alerts',
      value: stats?.safetyAlerts,
      icon: 'AlertTriangle',
      color: stats?.safetyAlerts > 5 ? 'text-error' : 'text-muted-foreground',
      bgColor: stats?.safetyAlerts > 5 ? 'bg-error/10' : 'bg-muted/10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Current Time */}
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center justify-center">
          <Icon name="Clock" size={20} className="mr-2 text-primary" />
          System Time
        </h3>
        <div className="space-y-2">
          <div className="text-2xl font-mono font-bold text-foreground">
            {currentTime?.toLocaleTimeString('en-US', { 
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
          <div className="text-sm text-muted-foreground">
            {currentTime?.toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>
      {/* Real-time Statistics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Activity" size={20} className="mr-2 text-primary" />
          Live System Status
        </h3>
        
        <div className="space-y-4">
          {statItems?.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${item?.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon name={item?.icon} size={20} className={item?.color} />
                </div>
                <span className="text-sm font-medium text-foreground">{item?.label}</span>
              </div>
              <span className={`text-lg font-bold ${item?.color}`}>{item?.value}</span>
            </div>
          ))}
        </div>
      </div>
      {/* System Uptime */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Server" size={20} className="mr-2 text-primary" />
          System Health
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Uptime</span>
            <span className="text-lg font-bold text-success">{stats?.uptime}%</span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-success h-2 rounded-full transition-all duration-300"
              style={{ width: `${stats?.uptime}%` }}
            ></div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-subtle"></div>
            <span className="text-muted-foreground">All systems operational</span>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Zap" size={20} className="mr-2 text-primary" />
          Recent Activity
        </h3>
        
        <div className="space-y-3 text-xs">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
            <span>Site B-12 came online</span>
            <span className="ml-auto">2m ago</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="w-1.5 h-1.5 bg-warning rounded-full"></div>
            <span>Device calibration completed</span>
            <span className="ml-auto">5m ago</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            <span>Safety report generated</span>
            <span className="ml-auto">12m ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStats;