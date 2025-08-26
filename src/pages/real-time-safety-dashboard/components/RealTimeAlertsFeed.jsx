import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RealTimeAlertsFeed = ({ className = '' }) => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');

  const initialAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Helmet Removed - Worker #247',
      message: 'Safety helmet disconnected in high-risk welding zone',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      worker: 'Sarah Chen',
      zone: 'Welding Station',
      status: 'active'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Low Battery Alert',
      message: 'Worker #156 helmet battery at 15% - requires charging',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      worker: 'Lisa Rodriguez',
      zone: 'Packaging',
      status: 'acknowledged'
    },
    {
      id: 3,
      type: 'info',
      title: 'Zone Entry Notification',
      message: 'Worker #089 entered restricted maintenance area',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      worker: 'Mike Johnson',
      zone: 'Maintenance Bay',
      status: 'resolved'
    },
    {
      id: 4,
      type: 'critical',
      title: 'Emergency Button Activated',
      message: 'Emergency alert triggered by Worker #134 in Assembly Area',
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      worker: 'John Martinez',
      zone: 'Assembly Area',
      status: 'active'
    },
    {
      id: 5,
      type: 'warning',
      title: 'Environmental Alert',
      message: 'CO2 levels elevated in Storage Zone - ventilation activated',
      timestamp: new Date(Date.now() - 18 * 60 * 1000),
      worker: null,
      zone: 'Storage',
      status: 'acknowledged'
    },
    {
      id: 6,
      type: 'info',
      title: 'Shift Change Complete',
      message: 'All workers from previous shift have checked out successfully',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      worker: null,
      zone: 'All Zones',
      status: 'resolved'
    }
  ];

  useEffect(() => {
    setAlerts(initialAlerts);
    
    // Simulate real-time alerts
    const interval = setInterval(() => {
      const newAlert = {
        id: Date.now(),
        type: Math.random() > 0.7 ? 'critical' : Math.random() > 0.5 ? 'warning' : 'info',
        title: 'New Safety Alert',
        message: 'Real-time safety monitoring detected an event',
        timestamp: new Date(),
        worker: `Worker #${Math.floor(Math.random() * 999)}`,
        zone: ['Assembly Area', 'Welding Station', 'Quality Control', 'Packaging', 'Storage']?.[Math.floor(Math.random() * 5)],
        status: 'active'
      };
      
      setAlerts(prev => [newAlert, ...prev?.slice(0, 9)]);
    }, 30000); // New alert every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return 'AlertTriangle';
      case 'warning':
        return 'AlertCircle';
      case 'info':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical':
        return 'text-error border-l-error bg-error/5';
      case 'warning':
        return 'text-warning border-l-warning bg-warning/5';
      case 'info':
        return 'text-primary border-l-primary bg-primary/5';
      default:
        return 'text-muted-foreground border-l-border bg-muted/5';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return 'bg-error text-error-foreground';
      case 'acknowledged':
        return 'bg-warning text-warning-foreground';
      case 'resolved':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000 / 60);
    
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  const filteredAlerts = filter === 'all' ? alerts : alerts?.filter(alert => alert?.type === filter);

  const handleAlertAction = (alertId, action) => {
    setAlerts(prev => prev?.map(alert => 
      alert?.id === alertId 
        ? { ...alert, status: action === 'acknowledge' ? 'acknowledged' : 'resolved' }
        : alert
    ));
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Real-Time Alerts</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'critical' ? 'destructive' : 'outline'}
            size="sm"
            onClick={() => setFilter('critical')}
          >
            Critical
          </Button>
          <Button
            variant={filter === 'warning' ? 'warning' : 'outline'}
            size="sm"
            onClick={() => setFilter('warning')}
          >
            Warning
          </Button>
          <Button
            variant={filter === 'info' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('info')}
          >
            Info
          </Button>
        </div>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredAlerts?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="CheckCircle" size={48} className="mx-auto mb-3 opacity-50" />
            <p>No alerts matching the current filter</p>
          </div>
        ) : (
          filteredAlerts?.map((alert) => (
            <div
              key={alert?.id}
              className={`p-4 rounded-lg border-l-4 border border-border hover:shadow-elevation-1 transition-shadow ${getAlertColor(alert?.type)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <Icon 
                    name={getAlertIcon(alert?.type)} 
                    size={20} 
                    className={`mt-0.5 ${alert?.type === 'critical' ? 'text-error' : alert?.type === 'warning' ? 'text-warning' : 'text-primary'}`} 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-semibold text-foreground truncate">
                        {alert?.title}
                      </h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusBadge(alert?.status)}`}>
                        {alert?.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {alert?.message}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{formatTimeAgo(alert?.timestamp)}</span>
                      {alert?.worker && (
                        <span className="flex items-center space-x-1">
                          <Icon name="User" size={12} />
                          <span>{alert?.worker}</span>
                        </span>
                      )}
                      <span className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{alert?.zone}</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                {alert?.status === 'active' && (
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAlertAction(alert?.id, 'acknowledge')}
                    >
                      Acknowledge
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleAlertAction(alert?.id, 'resolve')}
                    >
                      Resolve
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredAlerts?.length} of {alerts?.length} alerts
          </div>
          <Button variant="outline" size="sm">
            View All Alerts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RealTimeAlertsFeed;