import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ 
  title, 
  value, 
  unit = '', 
  icon, 
  status = 'normal', 
  trend = null,
  onClick = () => {},
  className = '' 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'critical':
        return 'border-error bg-error/5 text-error';
      case 'warning':
        return 'border-warning bg-warning/5 text-warning';
      case 'success':
        return 'border-success bg-success/5 text-success';
      default:
        return 'border-border bg-card text-foreground';
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend > 0 ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = () => {
    if (!trend) return '';
    return trend > 0 ? 'text-success' : 'text-error';
  };

  return (
    <div 
      className={`p-6 rounded-lg border-2 cursor-pointer hover:shadow-elevation-2 transition-all duration-200 ${getStatusColor()} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${status === 'critical' ? 'bg-error/20' : status === 'warning' ? 'bg-warning/20' : status === 'success' ? 'bg-success/20' : 'bg-primary/20'}`}>
            <Icon 
              name={icon} 
              size={24} 
              className={status === 'critical' ? 'text-error' : status === 'warning' ? 'text-warning' : status === 'success' ? 'text-success' : 'text-primary'} 
            />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        {trend !== null && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            <Icon name={getTrendIcon()} size={16} />
            <span className="text-xs font-medium">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold">{value}</span>
        {unit && <span className="text-lg text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );
};

export default KPICard;