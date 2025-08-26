import React from 'react';
import Icon from '../../../components/AppIcon';

const EnvironmentalKPICard = ({ 
  title, 
  value, 
  unit, 
  threshold, 
  status, 
  trend, 
  trendValue, 
  icon,
  className = '' 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'safe':
        return 'text-success border-success/20 bg-success/5';
      case 'caution':
        return 'text-warning border-warning/20 bg-warning/5';
      case 'danger':
        return 'text-error border-error/20 bg-error/5';
      default:
        return 'text-muted-foreground border-border bg-card';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      case 'stable':
        return 'Minus';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-error';
      case 'down':
        return 'text-success';
      case 'stable':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className={`bg-card border rounded-lg p-6 ${getStatusColor(status)} ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${status === 'safe' ? 'bg-success/10' : status === 'caution' ? 'bg-warning/10' : status === 'danger' ? 'bg-error/10' : 'bg-muted'}`}>
            <Icon 
              name={icon} 
              size={20} 
              className={status === 'safe' ? 'text-success' : status === 'caution' ? 'text-warning' : status === 'danger' ? 'text-error' : 'text-muted-foreground'} 
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-foreground">{value}</span>
              <span className="text-sm text-muted-foreground">{unit}</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center space-x-1 mb-1">
            <Icon 
              name={getTrendIcon(trend)} 
              size={16} 
              className={getTrendColor(trend)} 
            />
            <span className={`text-sm font-medium ${getTrendColor(trend)}`}>
              {trendValue}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            Threshold: {threshold} {unit}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'safe' ? 'bg-success/10 text-success' : 
          status === 'caution' ? 'bg-warning/10 text-warning' : 
          status === 'danger'? 'bg-error/10 text-error' : 'bg-muted text-muted-foreground'
        }`}>
          {status === 'safe' ? 'Normal' : status === 'caution' ? 'Warning' : status === 'danger' ? 'Critical' : 'Unknown'}
        </div>
        
        <div className="text-xs text-muted-foreground">
          Last updated: {new Date()?.toLocaleTimeString('en-US', { hour12: false })}
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalKPICard;