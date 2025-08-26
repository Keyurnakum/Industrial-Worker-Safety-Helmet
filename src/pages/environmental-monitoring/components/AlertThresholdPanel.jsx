import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AlertThresholdPanel = ({ 
  onThresholdUpdate = () => {},
  className = '' 
}) => {
  const [thresholds, setThresholds] = useState({
    temperature: { min: 18, max: 35, current: 25 },
    humidity: { min: 30, max: 70, current: 45 },
    co2: { min: 0, max: 1000, current: 400 },
    noise: { min: 0, max: 85, current: 65 }
  });

  const [editingThreshold, setEditingThreshold] = useState(null);
  const [tempValues, setTempValues] = useState({});

  const thresholdConfig = [
    {
      key: 'temperature',
      label: 'Temperature',
      icon: 'Thermometer',
      unit: '°C',
      color: 'text-orange-500'
    },
    {
      key: 'humidity',
      label: 'Humidity',
      icon: 'Droplets',
      unit: '%',
      color: 'text-blue-500'
    },
    {
      key: 'co2',
      label: 'CO2 Level',
      icon: 'Wind',
      unit: 'ppm',
      color: 'text-green-500'
    },
    {
      key: 'noise',
      label: 'Noise Level',
      icon: 'Volume2',
      unit: 'dB',
      color: 'text-purple-500'
    }
  ];

  const handleEditStart = (key) => {
    setEditingThreshold(key);
    setTempValues({
      min: thresholds?.[key]?.min,
      max: thresholds?.[key]?.max
    });
  };

  const handleEditCancel = () => {
    setEditingThreshold(null);
    setTempValues({});
  };

  const handleEditSave = () => {
    if (editingThreshold) {
      const updatedThresholds = {
        ...thresholds,
        [editingThreshold]: {
          ...thresholds?.[editingThreshold],
          min: tempValues?.min,
          max: tempValues?.max
        }
      };
      setThresholds(updatedThresholds);
      onThresholdUpdate(editingThreshold, tempValues);
      setEditingThreshold(null);
      setTempValues({});
    }
  };

  const getStatusColor = (current, min, max) => {
    if (current < min || current > max) {
      return 'text-error';
    }
    if (current <= min + (max - min) * 0.1 || current >= max - (max - min) * 0.1) {
      return 'text-warning';
    }
    return 'text-success';
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-2">Alert Thresholds</h3>
        <p className="text-sm text-muted-foreground">Configure environmental limits</p>
      </div>
      <div className="p-4 space-y-4">
        {thresholdConfig?.map((config) => {
          const threshold = thresholds?.[config?.key];
          const isEditing = editingThreshold === config?.key;
          
          return (
            <div key={config?.key} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Icon name={config?.icon} size={20} className={config?.color} />
                  <div>
                    <h4 className="text-sm font-medium text-foreground">{config?.label}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-muted-foreground">Current:</span>
                      <span className={`text-sm font-semibold ${getStatusColor(threshold?.current, threshold?.min, threshold?.max)}`}>
                        {threshold?.current} {config?.unit}
                      </span>
                    </div>
                  </div>
                </div>
                
                {!isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditStart(config?.key)}
                  >
                    <Icon name="Edit2" size={14} />
                  </Button>
                )}
              </div>
              {isEditing ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Min Threshold"
                      type="number"
                      value={tempValues?.min}
                      onChange={(e) => setTempValues(prev => ({ ...prev, min: parseFloat(e?.target?.value) }))}
                      className="text-sm"
                    />
                    <Input
                      label="Max Threshold"
                      type="number"
                      value={tempValues?.max}
                      onChange={(e) => setTempValues(prev => ({ ...prev, max: parseFloat(e?.target?.value) }))}
                      className="text-sm"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleEditSave}
                    >
                      <Icon name="Check" size={14} />
                      Save
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleEditCancel}
                    >
                      <Icon name="X" size={14} />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Range:</span>
                    <span className="font-medium text-foreground">
                      {threshold?.min} - {threshold?.max} {config?.unit}
                    </span>
                  </div>
                  
                  {/* Visual Range Indicator */}
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="absolute h-full bg-success/30 rounded-full"
                      style={{ 
                        left: '0%', 
                        width: '100%' 
                      }}
                    />
                    <div 
                      className="absolute h-full w-1 bg-foreground rounded-full"
                      style={{ 
                        left: `${((threshold?.current - threshold?.min) / (threshold?.max - threshold?.min)) * 100}%`,
                        transform: 'translateX(-50%)'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => alert('Threshold settings exported')}
        >
          <Icon name="Download" size={14} />
          Export Settings
        </Button>
      </div>
    </div>
  );
};

export default AlertThresholdPanel;