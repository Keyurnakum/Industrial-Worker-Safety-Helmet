import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SavedReportsTemplates = ({ 
  onLoadTemplate = () => {},
  onSaveTemplate = () => {},
  onDeleteTemplate = () => {},
  className = '' 
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');

  // Mock saved templates
  const savedTemplates = [
    {
      id: 1,
      name: "Daily Compliance Check",
      description: "Quick daily compliance overview with key metrics",
      type: "compliance",
      frequency: "daily",
      lastUsed: new Date('2024-06-25'),
      config: {
        reportType: 'compliance',
        dateRange: 'today',
        sites: ['all_sites'],
        format: 'pdf',
        includeCharts: true
      }
    },
    {
      id: 2,
      name: "Weekly Safety Summary",
      description: "Comprehensive weekly safety report for management",
      type: "summary",
      frequency: "weekly",
      lastUsed: new Date('2024-06-20'),
      config: {
        reportType: 'safety_metrics',
        dateRange: 'last_7_days',
        sites: ['all_sites'],
        format: 'pdf',
        includeCharts: true,
        includeDetails: true
      }
    },
    {
      id: 3,
      name: "Monthly Incident Analysis",
      description: "Detailed incident analysis with trends and recommendations",
      type: "incident",
      frequency: "monthly",
      lastUsed: new Date('2024-05-31'),
      config: {
        reportType: 'incident',
        dateRange: 'last_30_days',
        sites: ['all_sites'],
        format: 'excel',
        includeCharts: true,
        includeDetails: true
      }
    },
    {
      id: 4,
      name: "Environmental Monitoring",
      description: "Environmental sensor data and compliance tracking",
      type: "environmental",
      frequency: "weekly",
      lastUsed: new Date('2024-06-22'),
      config: {
        reportType: 'environmental',
        dateRange: 'last_7_days',
        sites: ['site_a', 'site_c'],
        format: 'csv',
        includeCharts: false
      }
    },
    {
      id: 5,
      name: "Executive Dashboard",
      description: "High-level safety metrics for executive review",
      type: "executive",
      frequency: "monthly",
      lastUsed: new Date('2024-06-01'),
      config: {
        reportType: 'safety_metrics',
        dateRange: 'last_30_days',
        sites: ['all_sites'],
        format: 'pdf',
        includeCharts: true,
        includeDetails: false
      }
    }
  ];

  const quickFilters = [
    {
      id: 'today',
      name: 'Today\'s Reports',
      icon: 'Calendar',
      description: 'Generate reports for today\'s data',
      config: { dateRange: 'today' }
    },
    {
      id: 'critical_only',
      name: 'Critical Incidents',
      icon: 'AlertTriangle',
      description: 'Focus on critical safety violations',
      config: { severity: 'critical' }
    },
    {
      id: 'compliance_check',
      name: 'Compliance Status',
      icon: 'CheckCircle',
      description: 'Current compliance across all sites',
      config: { reportType: 'compliance', dateRange: 'today' }
    },
    {
      id: 'environmental',
      name: 'Environmental Data',
      icon: 'Thermometer',
      description: 'Latest environmental monitoring data',
      config: { reportType: 'environmental', dateRange: 'last_24_hours' }
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'compliance':
        return 'CheckCircle';
      case 'incident':
        return 'AlertTriangle';
      case 'environmental':
        return 'Thermometer';
      case 'summary':
        return 'BarChart3';
      case 'executive':
        return 'TrendingUp';
      default:
        return 'FileText';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'compliance':
        return 'text-success bg-success/10 border-success/20';
      case 'incident':
        return 'text-error bg-error/10 border-error/20';
      case 'environmental':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'summary':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'executive':
        return 'text-accent bg-accent/10 border-accent/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleLoadTemplate = (template) => {
    setSelectedTemplate(template);
    onLoadTemplate(template?.config);
  };

  const handleSaveTemplate = () => {
    if (newTemplateName?.trim()) {
      const newTemplate = {
        id: Date.now(),
        name: newTemplateName,
        description: 'Custom saved template',
        type: 'custom',
        frequency: 'custom',
        lastUsed: new Date(),
        config: {} // This would come from the current report configuration
      };
      onSaveTemplate(newTemplate);
      setNewTemplateName('');
      setShowSaveDialog(false);
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Bookmark" size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Saved Templates</h3>
            <p className="text-xs text-muted-foreground">Quick report generation</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSaveDialog(true)}
          iconName="Plus"
          className="h-8 w-8"
        />
      </div>
      <div className="p-4">
        {/* Quick Filters */}
        <div className="mb-6">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Quick Filters
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {quickFilters?.map((filter) => (
              <button
                key={filter?.id}
                onClick={() => onLoadTemplate(filter?.config)}
                className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200 text-left"
              >
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={filter?.icon} size={14} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{filter?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{filter?.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Saved Templates */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Saved Templates
          </h4>
          <div className="space-y-2">
            {savedTemplates?.map((template) => (
              <div
                key={template?.id}
                className={`p-3 rounded-lg border transition-colors duration-200 ${
                  selectedTemplate?.id === template?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(template?.type)}`}>
                      <Icon name={getTypeIcon(template?.type)} size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-medium text-foreground truncate">
                        {template?.name}
                      </h5>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {template?.description}
                      </p>
                      <div className="flex items-center space-x-3 mt-2">
                        <span className="text-xs text-muted-foreground">
                          {template?.frequency}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Last used: {formatDate(template?.lastUsed)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 ml-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleLoadTemplate(template)}
                      className="h-6 w-6"
                    >
                      <Icon name="Play" size={12} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteTemplate(template?.id)}
                      className="h-6 w-6 text-error hover:text-error"
                    >
                      <Icon name="Trash2" size={12} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Save Template Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-500">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Save Template</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Template Name
              </label>
              <input
                type="text"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e?.target?.value)}
                placeholder="Enter template name"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowSaveDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleSaveTemplate}
                disabled={!newTemplateName?.trim()}
              >
                Save Template
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedReportsTemplates;