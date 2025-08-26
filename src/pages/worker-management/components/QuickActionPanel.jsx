import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionPanel = ({ 
  onAction = () => {},
  className = ""
}) => {
  const quickActions = [
    {
      id: 'emergency_alert',
      label: 'Emergency Alert',
      description: 'Send emergency notification to all workers',
      icon: 'AlertTriangle',
      variant: 'destructive',
      urgent: true
    },
    {
      id: 'shift_change',
      label: 'Shift Change',
      description: 'Manage shift transitions and handovers',
      icon: 'Clock',
      variant: 'outline'
    },
    {
      id: 'safety_briefing',
      label: 'Safety Briefing',
      description: 'Schedule or start safety briefing session',
      icon: 'MessageSquare',
      variant: 'outline'
    },
    {
      id: 'equipment_check',
      label: 'Equipment Check',
      description: 'Initiate helmet and device status check',
      icon: 'Shield',
      variant: 'outline'
    },
    {
      id: 'zone_lockdown',
      label: 'Zone Lockdown',
      description: 'Restrict access to specific safety zones',
      icon: 'Lock',
      variant: 'outline'
    },
    {
      id: 'export_report',
      label: 'Export Report',
      description: 'Generate and download worker reports',
      icon: 'Download',
      variant: 'secondary'
    }
  ];

  return (
    <div className={`bg-card rounded-lg border border-border p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-foreground">Quick Actions</h3>
        <Icon name="Zap" size={16} className="text-primary" />
      </div>
      <div className="space-y-3">
        {quickActions?.map((action) => (
          <div key={action?.id} className="group">
            <Button
              variant={action?.variant}
              onClick={() => onAction(action?.id)}
              className={`w-full justify-start h-auto p-3 ${
                action?.urgent ? 'animate-pulse-subtle' : ''
              }`}
            >
              <div className="flex items-center space-x-3 w-full">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  action?.variant === 'destructive' ? 'bg-error/20' :
                  action?.variant === 'secondary' ? 'bg-secondary/20' : 'bg-primary/10'
                }`}>
                  <Icon 
                    name={action?.icon} 
                    size={16} 
                    className={
                      action?.variant === 'destructive' ? 'text-error' :
                      action?.variant === 'secondary' ? 'text-secondary' : 'text-primary'
                    }
                  />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium">{action?.label}</div>
                  <div className="text-xs opacity-70 mt-0.5">{action?.description}</div>
                </div>
                <Icon name="ChevronRight" size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            </Button>
          </div>
        ))}
      </div>
      {/* System Status */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>System Status</span>
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse-subtle"></div>
            <span>Online</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last Update</span>
          <span>{new Date()?.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
          })}</span>
        </div>
      </div>
    </div>
  );
};

export default QuickActionPanel;