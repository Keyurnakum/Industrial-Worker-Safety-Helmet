import React from 'react';
import Icon from '../../../components/AppIcon';


const AlertCard = ({ 
  alert, 
  isSelected = false, 
  onClick = () => {},
  onStatusUpdate = () => {},
  className = '' 
}) => {
  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'border-l-error bg-error/5';
      case 'high':
        return 'border-l-warning bg-warning/5';
      case 'medium':
        return 'border-l-accent bg-accent/5';
      case 'low':
        return 'border-l-primary bg-primary/5';
      default:
        return 'border-l-border bg-muted/5';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'AlertTriangle';
      case 'high':
        return 'AlertCircle';
      case 'medium':
        return 'AlertOctagon';
      case 'low':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'bg-error text-error-foreground';
      case 'investigating':
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

  return (
    <div
      onClick={() => onClick(alert)}
      className={`border-l-4 bg-card border border-border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-elevation-2 ${
        isSelected ? 'ring-2 ring-primary shadow-elevation-2' : ''
      } ${getSeverityColor(alert?.severity)} ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon 
            name={getSeverityIcon(alert?.severity)} 
            size={16} 
            className={`${alert?.severity?.toLowerCase() === 'critical' ? 'text-error' : 
              alert?.severity?.toLowerCase() === 'high' ? 'text-warning' : 
              alert?.severity?.toLowerCase() === 'medium' ? 'text-accent' : 'text-primary'}`} 
          />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {alert?.type}
          </span>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(alert?.status)}`}>
          {alert?.status}
        </span>
      </div>
      {/* Title and Description */}
      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
        {alert?.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {alert?.description}
      </p>
      {/* Worker and Location Info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="User" size={14} className="text-muted-foreground" />
          <span className="text-sm text-foreground font-medium">
            {alert?.workerName}
          </span>
          <span className="text-xs text-muted-foreground">
            #{alert?.workerId}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="MapPin" size={14} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {alert?.location}
          </span>
        </div>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {formatTimeAgo(alert?.timestamp)}
        </span>
        <div className="flex items-center space-x-1">
          {alert?.hasPhotos && (
            <Icon name="Camera" size={14} className="text-muted-foreground" />
          )}
          {alert?.hasWitnesses && (
            <Icon name="Users" size={14} className="text-muted-foreground" />
          )}
          <span className={`w-2 h-2 rounded-full ${
            alert?.severity?.toLowerCase() === 'critical' ? 'bg-error animate-pulse-subtle' :
            alert?.severity?.toLowerCase() === 'high' ? 'bg-warning' :
            alert?.severity?.toLowerCase() === 'medium' ? 'bg-accent' : 'bg-primary'
          }`}></span>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;