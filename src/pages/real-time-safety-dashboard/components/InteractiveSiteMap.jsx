import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveSiteMap = ({ className = '' }) => {
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);

  const workers = [
    {
      id: 'W001',
      name: 'John Martinez',
      position: { x: 25, y: 30 },
      status: 'compliant',
      helmet: { connected: true, battery: 85 },
      zone: 'Assembly Area'
    },
    {
      id: 'W002',
      name: 'Sarah Chen',
      position: { x: 45, y: 55 },
      status: 'violation',
      helmet: { connected: true, battery: 42 },
      zone: 'Welding Station'
    },
    {
      id: 'W003',
      name: 'Mike Johnson',
      position: { x: 70, y: 25 },
      status: 'compliant',
      helmet: { connected: true, battery: 91 },
      zone: 'Quality Control'
    },
    {
      id: 'W004',
      name: 'Lisa Rodriguez',
      position: { x: 60, y: 70 },
      status: 'warning',
      helmet: { connected: false, battery: 15 },
      zone: 'Packaging'
    },
    {
      id: 'W005',
      name: 'David Kim',
      position: { x: 35, y: 80 },
      status: 'compliant',
      helmet: { connected: true, battery: 67 },
      zone: 'Storage'
    }
  ];

  const safetyZones = [
    {
      id: 'zone1',
      name: 'Assembly Area',
      bounds: { x: 15, y: 20, width: 25, height: 25 },
      type: 'normal',
      hazardLevel: 'low'
    },
    {
      id: 'zone2',
      name: 'Welding Station',
      bounds: { x: 35, y: 45, width: 20, height: 20 },
      type: 'restricted',
      hazardLevel: 'high'
    },
    {
      id: 'zone3',
      name: 'Quality Control',
      bounds: { x: 60, y: 15, width: 25, height: 20 },
      type: 'normal',
      hazardLevel: 'low'
    },
    {
      id: 'zone4',
      name: 'Packaging',
      bounds: { x: 50, y: 60, width: 25, height: 20 },
      type: 'normal',
      hazardLevel: 'medium'
    },
    {
      id: 'zone5',
      name: 'Storage',
      bounds: { x: 25, y: 70, width: 20, height: 20 },
      type: 'normal',
      hazardLevel: 'low'
    }
  ];

  const getWorkerStatusColor = (status) => {
    switch (status) {
      case 'compliant':
        return 'bg-success border-success';
      case 'violation':
        return 'bg-error border-error animate-pulse-subtle';
      case 'warning':
        return 'bg-warning border-warning';
      default:
        return 'bg-muted border-border';
    }
  };

  const getZoneColor = (type, hazardLevel) => {
    if (type === 'restricted') {
      return 'border-error bg-error/10';
    }
    switch (hazardLevel) {
      case 'high':
        return 'border-error bg-error/5';
      case 'medium':
        return 'border-warning bg-warning/5';
      case 'low':
        return 'border-success bg-success/5';
      default:
        return 'border-border bg-muted/5';
    }
  };

  const handleWorkerClick = (worker) => {
    setSelectedWorker(worker);
    setSelectedZone(null);
  };

  const handleZoneClick = (zone) => {
    setSelectedZone(zone);
    setSelectedWorker(null);
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Site Map - Manufacturing Floor</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-sm text-muted-foreground">Compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-sm text-muted-foreground">Warning</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-sm text-muted-foreground">Violation</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <div className="relative bg-muted/20 rounded-lg border-2 border-dashed border-border h-96 overflow-hidden">
            {/* Safety Zones */}
            {safetyZones?.map((zone) => (
              <div
                key={zone?.id}
                className={`absolute border-2 rounded-lg cursor-pointer hover:opacity-80 transition-opacity ${getZoneColor(zone?.type, zone?.hazardLevel)}`}
                style={{
                  left: `${zone?.bounds?.x}%`,
                  top: `${zone?.bounds?.y}%`,
                  width: `${zone?.bounds?.width}%`,
                  height: `${zone?.bounds?.height}%`
                }}
                onClick={() => handleZoneClick(zone)}
              >
                <div className="p-2">
                  <span className="text-xs font-medium text-foreground">{zone?.name}</span>
                </div>
              </div>
            ))}

            {/* Worker Pins */}
            {workers?.map((worker) => (
              <div
                key={worker?.id}
                className={`absolute w-8 h-8 rounded-full border-2 cursor-pointer hover:scale-110 transition-transform flex items-center justify-center ${getWorkerStatusColor(worker?.status)}`}
                style={{
                  left: `${worker?.position?.x}%`,
                  top: `${worker?.position?.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => handleWorkerClick(worker)}
              >
                <Icon 
                  name="HardHat" 
                  size={16} 
                  className="text-white" 
                />
              </div>
            ))}

            {/* Map Labels */}
            <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-2">Site Layout</h3>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>• Click zones for details</div>
                <div>• Click worker pins for status</div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Panel */}
        <div className="space-y-4">
          {selectedWorker && (
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Worker Details</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedWorker(null)}
                  className="h-6 w-6"
                >
                  <Icon name="X" size={14} />
                </Button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-foreground">{selectedWorker?.name}</span>
                  <div className="text-xs text-muted-foreground">ID: {selectedWorker?.id}</div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getWorkerStatusColor(selectedWorker?.status)?.split(' ')?.[0]}`}></div>
                  <span className="text-sm capitalize text-foreground">{selectedWorker?.status}</span>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <div>Zone: {selectedWorker?.zone}</div>
                  <div>Helmet: {selectedWorker?.helmet?.connected ? 'Connected' : 'Disconnected'}</div>
                  <div>Battery: {selectedWorker?.helmet?.battery}%</div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  View Full Profile
                </Button>
              </div>
            </div>
          )}

          {selectedZone && (
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Zone Details</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedZone(null)}
                  className="h-6 w-6"
                >
                  <Icon name="X" size={14} />
                </Button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-foreground">{selectedZone?.name}</span>
                  <div className="text-xs text-muted-foreground">ID: {selectedZone?.id}</div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <div>Type: {selectedZone?.type}</div>
                  <div>Hazard Level: {selectedZone?.hazardLevel}</div>
                  <div>Workers: {workers?.filter(w => w?.zone === selectedZone?.name)?.length}</div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  Zone Settings
                </Button>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-foreground mb-3">Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Workers:</span>
                <span className="font-medium text-foreground">{workers?.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Compliant:</span>
                <span className="font-medium text-success">{workers?.filter(w => w?.status === 'compliant')?.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Violations:</span>
                <span className="font-medium text-error">{workers?.filter(w => w?.status === 'violation')?.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Warnings:</span>
                <span className="font-medium text-warning">{workers?.filter(w => w?.status === 'warning')?.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveSiteMap;