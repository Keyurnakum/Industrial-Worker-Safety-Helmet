import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const IncidentDetails = ({ 
  incident = null, 
  onStatusUpdate = () => {},
  onAssignInvestigator = () => {},
  onAddNote = () => {},
  className = '' 
}) => {
  const [newNote, setNewNote] = useState('');
  const [showAddNote, setShowAddNote] = useState(false);

  if (!incident) {
    return (
      <div className={`bg-card border border-border rounded-lg p-8 ${className}`}>
        <div className="text-center">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Select an Incident
          </h3>
          <p className="text-muted-foreground">
            Choose an incident from the list to view detailed information and manage the investigation.
          </p>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      case 'high':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'medium':
        return 'text-accent bg-accent/10 border-accent/20';
      case 'low':
        return 'text-primary bg-primary/10 border-primary/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
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

  const handleAddNote = () => {
    if (newNote?.trim()) {
      onAddNote(incident?.id, newNote?.trim());
      setNewNote('');
      setShowAddNote(false);
    }
  };

  const formatDateTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getSeverityColor(incident?.severity)}`}>
                {incident?.severity}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(incident?.status)}`}>
                {incident?.status}
              </span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              {incident?.title}
            </h2>
            <p className="text-muted-foreground">
              Incident #{incident?.id} • {formatDateTime(incident?.timestamp)}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Edit"
              iconPosition="left"
            >
              Edit
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onStatusUpdate(incident?.id, 'investigating')}
            disabled={incident?.status === 'investigating'}
          >
            Start Investigation
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onStatusUpdate(incident?.id, 'resolved')}
            disabled={incident?.status === 'resolved'}
          >
            Mark Resolved
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAssignInvestigator(incident?.id)}
          >
            Assign Investigator
          </Button>
        </div>
      </div>
      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Worker Information</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="User" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground font-medium">
                  {incident?.workerName}
                </span>
                <span className="text-xs text-muted-foreground">
                  #{incident?.workerId}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Briefcase" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {incident?.workerRole || 'Construction Worker'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Shift: {incident?.shift || 'Day Shift (6AM - 2PM)'}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Location & Context</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {incident?.location}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Building" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {incident?.zone || 'Zone C - Assembly Area'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Thermometer" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Conditions: {incident?.conditions || '24°C, Normal humidity'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Incident Description</h3>
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm text-foreground leading-relaxed">
              {incident?.description}
            </p>
          </div>
        </div>

        {/* Photos */}
        {incident?.photos && incident?.photos?.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Evidence Photos ({incident?.photos?.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {incident?.photos?.map((photo, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={photo?.url}
                      alt={photo?.caption || `Evidence photo ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                    <Icon name="ZoomIn" size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Investigation Timeline</h3>
          <div className="space-y-4">
            {incident?.timeline && incident?.timeline?.map((event, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  event?.type === 'created' ? 'bg-primary' :
                  event?.type === 'investigating' ? 'bg-warning' :
                  event?.type === 'resolved' ? 'bg-success' : 'bg-muted-foreground'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">
                      {event?.action}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {formatDateTime(event?.timestamp)}
                    </span>
                  </div>
                  {event?.note && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {event?.note}
                    </p>
                  )}
                  {event?.user && (
                    <p className="text-xs text-muted-foreground mt-1">
                      by {event?.user}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Note Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Investigation Notes</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddNote(!showAddNote)}
              iconName="Plus"
              iconPosition="left"
            >
              Add Note
            </Button>
          </div>

          {showAddNote && (
            <div className="bg-muted rounded-lg p-4 mb-4">
              <Input
                type="text"
                placeholder="Add investigation note..."
                value={newNote}
                onChange={(e) => setNewNote(e?.target?.value)}
                className="mb-3"
              />
              <div className="flex items-center space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleAddNote}
                  disabled={!newNote?.trim()}
                >
                  Add Note
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAddNote(false);
                    setNewNote('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Existing Notes */}
          {incident?.notes && incident?.notes?.length > 0 && (
            <div className="space-y-3">
              {incident?.notes?.map((note, index) => (
                <div key={index} className="bg-muted rounded-lg p-3">
                  <p className="text-sm text-foreground mb-2">
                    {note?.content}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{note?.author}</span>
                    <span>{formatDateTime(note?.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentDetails;