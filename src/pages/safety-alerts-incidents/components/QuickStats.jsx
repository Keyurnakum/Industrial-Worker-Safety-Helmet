import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ 
  stats = {},
  className = '' 
}) => {
  const defaultStats = {
    totalIncidents: 24,
    openIncidents: 8,
    criticalIncidents: 3,
    resolvedToday: 5,
    averageResolutionTime: '2.4 hours',
    complianceRate: 94.2
  };

  const currentStats = { ...defaultStats, ...stats };

  const statCards = [
    {
      label: 'Total Incidents',
      value: currentStats?.totalIncidents,
      icon: 'AlertTriangle',
      color: 'text-foreground',
      bgColor: 'bg-muted/50',
      change: '+3 from yesterday'
    },
    {
      label: 'Open Incidents',
      value: currentStats?.openIncidents,
      icon: 'AlertCircle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      change: '-2 from yesterday'
    },
    {
      label: 'Critical',
      value: currentStats?.criticalIncidents,
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      change: 'Immediate attention required'
    },
    {
      label: 'Resolved Today',
      value: currentStats?.resolvedToday,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+2 from yesterday'
    },
    {
      label: 'Avg Resolution',
      value: currentStats?.averageResolutionTime,
      icon: 'Clock',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '15% faster than last week'
    },
    {
      label: 'Compliance Rate',
      value: `${currentStats?.complianceRate}%`,
      icon: 'Shield',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+1.2% from last month'
    }
  ];

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}>
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className={`bg-card border border-border rounded-lg p-4 ${stat?.bgColor}`}
        >
          <div className="flex items-center justify-between mb-2">
            <Icon 
              name={stat?.icon} 
              size={20} 
              className={stat?.color} 
            />
            <div className={`w-2 h-2 rounded-full ${
              stat?.color === 'text-error' ? 'bg-error animate-pulse-subtle' :
              stat?.color === 'text-success' ? 'bg-success' :
              stat?.color === 'text-primary' ? 'bg-primary' : 'bg-muted-foreground'
            }`}></div>
          </div>
          
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {stat?.value}
            </p>
            <p className="text-xs font-medium text-muted-foreground">
              {stat?.label}
            </p>
            <p className="text-xs text-muted-foreground">
              {stat?.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;