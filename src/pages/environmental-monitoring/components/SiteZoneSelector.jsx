import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SiteZoneSelector = ({ 
  onSiteChange = () => {},
  onZoneChange = () => {},
  className = '' 
}) => {
  const [selectedSite, setSelectedSite] = useState('site-a');
  const [selectedZone, setSelectedZone] = useState('zone-a1');
  const [expandedSites, setExpandedSites] = useState(['site-a']);

  const sitesData = [
    {
      id: 'site-a',
      name: 'Manufacturing Plant A',
      status: 'online',
      zones: [
        { id: 'zone-a1', name: 'Assembly Line 1', sensorCount: 12, status: 'safe' },
        { id: 'zone-a2', name: 'Assembly Line 2', sensorCount: 10, status: 'caution' },
        { id: 'zone-a3', name: 'Quality Control', sensorCount: 8, status: 'safe' },
        { id: 'zone-a4', name: 'Packaging Area', sensorCount: 6, status: 'safe' }
      ]
    },
    {
      id: 'site-b',
      name: 'Warehouse B',
      status: 'online',
      zones: [
        { id: 'zone-b1', name: 'Storage Area 1', sensorCount: 15, status: 'safe' },
        { id: 'zone-b2', name: 'Storage Area 2', sensorCount: 12, status: 'danger' },
        { id: 'zone-b3', name: 'Loading Dock', sensorCount: 8, status: 'safe' }
      ]
    },
    {
      id: 'site-c',
      name: 'Processing Plant C',
      status: 'maintenance',
      zones: [
        { id: 'zone-c1', name: 'Chemical Processing', sensorCount: 20, status: 'caution' },
        { id: 'zone-c2', name: 'Mixing Area', sensorCount: 14, status: 'safe' },
        { id: 'zone-c3', name: 'Storage Tanks', sensorCount: 18, status: 'safe' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'safe':
        return 'text-success';
      case 'caution':
        return 'text-warning';
      case 'danger':
        return 'text-error';
      case 'online':
        return 'text-success';
      case 'maintenance':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'safe':
        return 'CheckCircle';
      case 'caution':
        return 'AlertTriangle';
      case 'danger':
        return 'XCircle';
      case 'online':
        return 'Wifi';
      case 'maintenance':
        return 'Settings';
      default:
        return 'Circle';
    }
  };

  const toggleSiteExpansion = (siteId) => {
    setExpandedSites(prev => 
      prev?.includes(siteId) 
        ? prev?.filter(id => id !== siteId)
        : [...prev, siteId]
    );
  };

  const handleSiteSelect = (siteId) => {
    setSelectedSite(siteId);
    onSiteChange(siteId);
  };

  const handleZoneSelect = (zoneId, siteId) => {
    setSelectedZone(zoneId);
    setSelectedSite(siteId);
    onZoneChange(zoneId, siteId);
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-2">Site & Zone Selection</h3>
        <p className="text-sm text-muted-foreground">Select monitoring location</p>
      </div>
      <div className="p-4 max-h-96 overflow-y-auto">
        {sitesData?.map((site) => (
          <div key={site?.id} className="mb-4 last:mb-0">
            {/* Site Header */}
            <div className="flex items-center justify-between mb-2">
              <Button
                variant="ghost"
                onClick={() => toggleSiteExpansion(site?.id)}
                className="flex items-center space-x-2 p-2 w-full justify-start"
              >
                <Icon 
                  name={expandedSites?.includes(site?.id) ? "ChevronDown" : "ChevronRight"} 
                  size={16} 
                />
                <Icon name="Building" size={16} className="text-muted-foreground" />
                <span className="font-medium text-foreground">{site?.name}</span>
                <Icon 
                  name={getStatusIcon(site?.status)} 
                  size={14} 
                  className={getStatusColor(site?.status)} 
                />
              </Button>
            </div>

            {/* Zones List */}
            {expandedSites?.includes(site?.id) && (
              <div className="ml-6 space-y-1">
                {site?.zones?.map((zone) => (
                  <button
                    key={zone?.id}
                    onClick={() => handleZoneSelect(zone?.id, site?.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors duration-200 ${
                      selectedZone === zone?.id 
                        ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="MapPin" size={14} className="text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium text-foreground">{zone?.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {zone?.sensorCount} sensors
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getStatusIcon(zone?.status)} 
                        size={14} 
                        className={getStatusColor(zone?.status)} 
                      />
                      <div className={`w-2 h-2 rounded-full ${
                        zone?.status === 'safe' ? 'bg-success' :
                        zone?.status === 'caution' ? 'bg-warning' :
                        zone?.status === 'danger' ? 'bg-error' : 'bg-muted-foreground'
                      }`} />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Selected Info */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="text-sm">
          <span className="text-muted-foreground">Selected: </span>
          <span className="font-medium text-foreground">
            {sitesData?.find(s => s?.id === selectedSite)?.zones?.find(z => z?.id === selectedZone)?.name || 'None'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SiteZoneSelector;