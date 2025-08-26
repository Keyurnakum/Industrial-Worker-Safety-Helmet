import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AlertNotificationBadge = ({ 
  alerts = [],
  onAlertClick = () => {},
  onDismissAlert = () => {},
  className = '' 
}) => {
  const [visibleAlerts, setVisibleAlerts] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Sample alerts for demonstration
  const defaultAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Worker Down Alert',
      message: 'Worker #247 has not moved for 5 minutes in Zone C',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      zone: 'Zone C',
      workerId: '247'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Gas Level Warning',
      message: 'CO2 levels approaching threshold in Assembly Area',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      zone: 'Assembly Area',
      value: '450 ppm'
    },
    {
      id: 3,
      type: 'info',
      title: 'Equipment Maintenance',
      message: 'Safety sensor #12 requires calibration',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      zone: 'Zone A',
      equipmentId: '12'
    }
  ];

  const currentAlerts = alerts?.length > 0 ? alerts : defaultAlerts;

  useEffect(() => {
    setVisibleAlerts(currentAlerts);
  }, [alerts]);

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
        return 'text-error';
      case 'warning':
        return 'text-warning';
      case 'info':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  const getAlertBgColor = (type) => {
    switch (type) {
      case 'critical':
        return 'bg-error/10 border-error/20';
      case 'warning':
        return 'bg-warning/10 border-warning/20';
      case 'info':
        return 'bg-primary/10 border-primary/20';
      default:
        return 'bg-muted border-border';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000 / 60); // minutes
    
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  const handleAlertClick = (alert) => {
    onAlertClick(alert);
    setIsExpanded(false);
  };

  const handleDismissAlert = (alertId, event) => {
    event?.stopPropagation();
    setVisibleAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
    onDismissAlert(alertId);
  };

  const criticalCount = visibleAlerts?.filter(alert => alert?.type === 'critical')?.length;
  const totalCount = visibleAlerts?.length;

  if (totalCount === 0) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Alert Badge */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsExpanded(!isExpanded)}
        className={`relative ${criticalCount > 0 ? 'animate-pulse-subtle' : ''}`}
      >
        <Icon 
          name="Bell" 
          size={20} 
          className={criticalCount > 0 ? 'text-error' : 'text-muted-foreground'} 
        />
        {totalCount > 0 && (
          <span className={`absolute -top-1 -right-1 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${
            criticalCount > 0 
              ? 'bg-error text-error-foreground' 
              : 'bg-warning text-warning-foreground'
          }`}>
            {totalCount > 9 ? '9+' : totalCount}
          </span>
        )}
      </Button>
      {/* Expanded Alert Panel */}
      {isExpanded && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevation-3 z-400 slide-in">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="text-sm font-semibold text-popover-foreground">
              Safety Alerts ({totalCount})
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(false)}
              className="h-6 w-6"
            >
              <Icon name="X" size={14} />
            </Button>
          </div>

          {/* Alert List */}
          <div className="max-h-96 overflow-y-auto">
            {visibleAlerts?.map((alert) => (
              <div
                key={alert?.id}
                onClick={() => handleAlertClick(alert)}
                className={`p-4 border-l-4 border-b border-border last:border-b-0 cursor-pointer hover:bg-muted/50 transition-colors duration-200 ${getAlertBgColor(alert?.type)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <Icon 
                      name={getAlertIcon(alert?.type)} 
                      size={16} 
                      className={`mt-0.5 ${getAlertColor(alert?.type)}`} 
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-popover-foreground truncate">
                        {alert?.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {alert?.message}
                      </p>
                      <div className="flex items-center space-x-3 mt-2">
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(alert?.timestamp)}
                        </span>
                        {alert?.zone && (
                          <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">
                            {alert?.zone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleDismissAlert(alert?.id, e)}
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onAlertClick({ type: 'view_all' });
                setIsExpanded(false);
              }}
              className="w-full"
            >
              View All Alerts
            </Button>
          </div>
        </div>
      )}
      {/* Backdrop for mobile */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-300 lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default AlertNotificationBadge;