import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EnvironmentalViolationsList = ({ 
  onViolationClick = () => {},
  className = '' 
}) => {
  const [filter, setFilter] = useState('all');

  const violations = [
    {
      id: 1,
      type: 'temperature',
      severity: 'critical',
      title: 'Temperature Exceeded',
      description: 'Temperature reached 42°C in Assembly Line 1',
      location: 'Zone A1 - Assembly Line 1',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      value: '42°C',
      threshold: '35°C',
      status: 'active',
      duration: '15 min'
    },
    {
      id: 2,
      type: 'co2',
      severity: 'warning',
      title: 'CO2 Level High',
      description: 'CO2 concentration approaching limit in Storage Area 2',
      location: 'Zone B2 - Storage Area 2',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      value: '950 ppm',
      threshold: '1000 ppm',
      status: 'acknowledged',
      duration: '45 min'
    },
    {
      id: 3,
      type: 'noise',
      severity: 'warning',
      title: 'Noise Level Warning',
      description: 'Sustained noise levels above recommended threshold',
      location: 'Zone A2 - Assembly Line 2',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      value: '88 dB',
      threshold: '85 dB',
      status: 'resolved',
      duration: '1.2 hrs'
    },
    {
      id: 4,
      type: 'humidity',
      severity: 'info',
      title: 'Humidity Below Optimal',
      description: 'Low humidity detected in Quality Control area',
      location: 'Zone A3 - Quality Control',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      value: '25%',
      threshold: '30%',
      status: 'resolved',
      duration: '2.5 hrs'
    },
    {
      id: 5,
      type: 'temperature',
      severity: 'critical',
      title: 'Equipment Overheating',
      description: 'Critical temperature spike detected near processing unit',
      location: 'Zone C1 - Chemical Processing',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      value: '48°C',
      threshold: '40°C',
      status: 'resolved',
      duration: '30 min'
    }
  ];

  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Acknowledged', value: 'acknowledged' },
    { label: 'Resolved', value: 'resolved' }
  ];

  const severityOptions = [
    { label: 'Critical', value: 'critical' },
    { label: 'Warning', value: 'warning' },
    { label: 'Info', value: 'info' }
  ];

  const getViolationIcon = (type) => {
    switch (type) {
      case 'temperature':
        return 'Thermometer';
      case 'humidity':
        return 'Droplets';
      case 'co2':
        return 'Wind';
      case 'noise':
        return 'Volume2';
      default:
        return 'AlertTriangle';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-error border-error/20 bg-error/5';
      case 'warning':
        return 'text-warning border-warning/20 bg-warning/5';
      case 'info':
        return 'text-primary border-primary/20 bg-primary/5';
      default:
        return 'text-muted-foreground border-border bg-card';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-error/10 text-error';
      case 'acknowledged':
        return 'bg-warning/10 text-warning';
      case 'resolved':
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted text-muted-foreground';
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

  const filteredViolations = violations?.filter(violation => 
    filter === 'all' || violation?.status === filter
  );

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Environmental Violations</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => alert('Refreshing violations list')}
          >
            <Icon name="RefreshCw" size={14} />
          </Button>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          {filterOptions?.map((option) => (
            <Button
              key={option?.value}
              variant={filter === option?.value ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter(option?.value)}
              className="h-8 px-3 text-xs"
            >
              {option?.label}
              {option?.value !== 'all' && (
                <span className="ml-1 text-xs opacity-70">
                  ({violations?.filter(v => v?.status === option?.value)?.length})
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredViolations?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No Violations Found</h4>
            <p className="text-sm text-muted-foreground">
              {filter === 'all' ? 'All environmental parameters are within normal ranges.' : `No ${filter} violations at this time.`}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredViolations?.map((violation) => (
              <div
                key={violation?.id}
                onClick={() => onViolationClick(violation)}
                className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors duration-200 border-l-4 ${getSeverityColor(violation?.severity)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`p-2 rounded-lg ${
                      violation?.severity === 'critical' ? 'bg-error/10' :
                      violation?.severity === 'warning'? 'bg-warning/10' : 'bg-primary/10'
                    }`}>
                      <Icon 
                        name={getViolationIcon(violation?.type)} 
                        size={16} 
                        className={
                          violation?.severity === 'critical' ? 'text-error' :
                          violation?.severity === 'warning'? 'text-warning' : 'text-primary'
                        } 
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-medium text-foreground truncate">
                          {violation?.title}
                        </h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(violation?.status)}`}>
                          {violation?.status}
                        </span>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {violation?.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="MapPin" size={12} />
                          <span>{violation?.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>{formatTimeAgo(violation?.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right ml-4">
                    <div className="text-sm font-semibold text-foreground mb-1">
                      {violation?.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Limit: {violation?.threshold}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Duration: {violation?.duration}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {filteredViolations?.length > 0 && (
        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => alert('Exporting violations report')}
          >
            <Icon name="Download" size={14} />
            Export Violations Report
          </Button>
        </div>
      )}
    </div>
  );
};

export default EnvironmentalViolationsList;