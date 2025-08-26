import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WorkerProfileModal = ({ 
  worker = null,
  isOpen = false,
  onClose = () => {},
  onAction = () => {},
  className = ""
}) => {
  if (!isOpen || !worker) return null;

  const safetyHistory = [
    {
      id: 1,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      type: 'compliance',
      description: 'Helmet worn correctly throughout shift',
      status: 'good'
    },
    {
      id: 2,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      type: 'violation',
      description: 'Helmet removed in restricted zone for 3 minutes',
      status: 'warning'
    },
    {
      id: 3,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      type: 'training',
      description: 'Completed safety refresher training',
      status: 'good'
    }
  ];

  const deviceInfo = {
    helmetId: 'SH-2024-0247',
    batteryLevel: 78,
    lastSync: new Date(Date.now() - 15 * 60 * 1000),
    firmwareVersion: '2.1.4',
    sensorStatus: 'operational'
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Info';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-500 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-card rounded-lg shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold">
                {worker?.name?.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">{worker?.name}</h2>
                <p className="text-sm text-muted-foreground">ID: {worker?.employeeId}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Worker Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Worker Information</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Department:</span>
                    <span className="text-sm text-foreground">{worker?.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Current Shift:</span>
                    <span className="text-sm text-foreground">{worker?.shift}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Location:</span>
                    <span className="text-sm text-foreground">{worker?.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Compliance Score:</span>
                    <span className={`text-sm font-medium ${
                      worker?.complianceScore >= 90 ? 'text-success' :
                      worker?.complianceScore >= 70 ? 'text-warning' : 'text-error'
                    }`}>
                      {worker?.complianceScore}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <span className={`text-sm font-medium ${
                      worker?.helmetStatus === 'active' ? 'text-success' :
                      worker?.helmetStatus === 'violation' ? 'text-error' : 'text-muted-foreground'
                    }`}>
                      {worker?.helmetStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Device Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Device Information</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Helmet ID:</span>
                    <span className="text-sm text-foreground font-mono">{deviceInfo?.helmetId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Battery Level:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-foreground">{deviceInfo?.batteryLevel}%</span>
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            deviceInfo?.batteryLevel > 50 ? 'bg-success' :
                            deviceInfo?.batteryLevel > 20 ? 'bg-warning' : 'bg-error'
                          }`}
                          style={{ width: `${deviceInfo?.batteryLevel}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Sync:</span>
                    <span className="text-sm text-foreground">{formatTime(deviceInfo?.lastSync)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Firmware:</span>
                    <span className="text-sm text-foreground font-mono">{deviceInfo?.firmwareVersion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Sensor Status:</span>
                    <span className="text-sm text-success capitalize">{deviceInfo?.sensorStatus}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety History */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-foreground mb-3">Recent Safety History</h3>
              <div className="space-y-3">
                {safetyHistory?.map((event) => (
                  <div key={event?.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                    <Icon 
                      name={getStatusIcon(event?.status)} 
                      size={16} 
                      className={`mt-0.5 ${getStatusColor(event?.status)}`} 
                    />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{event?.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(event?.date)} • {event?.type}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => onAction('message', worker)}
            >
              <Icon name="MessageSquare" size={16} className="mr-2" />
              Send Message
            </Button>
            <Button
              variant="outline"
              onClick={() => onAction('location', worker)}
            >
              <Icon name="MapPin" size={16} className="mr-2" />
              Track Location
            </Button>
            <Button
              variant="default"
              onClick={() => onAction('edit', worker)}
            >
              <Icon name="Edit" size={16} className="mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfileModal;