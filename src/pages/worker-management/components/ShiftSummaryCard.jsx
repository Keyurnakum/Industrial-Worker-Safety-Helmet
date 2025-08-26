import React from 'react';
import Icon from '../../../components/AppIcon';

const ShiftSummaryCard = ({ 
  title = "Current Shift",
  totalWorkers = 0,
  activeWorkers = 0,
  complianceRate = 0,
  violations = 0,
  icon = "Users",
  className = ""
}) => {
  const complianceColor = complianceRate >= 90 ? 'text-success' : 
                         complianceRate >= 70 ? 'text-warning' : 'text-error';

  return (
    <div className={`bg-card rounded-lg border border-border p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={icon} size={16} className="text-primary" />
        </div>
      </div>

      <div className="space-y-3">
        {/* Total Workers */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-foreground">{totalWorkers}</span>
          <span className="text-xs text-muted-foreground">Total Workers</span>
        </div>

        {/* Active Workers */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm text-foreground">{activeWorkers} Active</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {totalWorkers > 0 ? Math.round((activeWorkers / totalWorkers) * 100) : 0}%
          </span>
        </div>

        {/* Compliance Rate */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={12} className={complianceColor} />
            <span className="text-sm text-foreground">Compliance</span>
          </div>
          <span className={`text-sm font-medium ${complianceColor}`}>
            {complianceRate}%
          </span>
        </div>

        {/* Violations */}
        {violations > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={12} className="text-error" />
              <span className="text-sm text-foreground">Violations</span>
            </div>
            <span className="text-sm font-medium text-error">{violations}</span>
          </div>
        )}

        {/* Progress Bar */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Safety Compliance</span>
            <span>{complianceRate}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                complianceRate >= 90 ? 'bg-success' :
                complianceRate >= 70 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${complianceRate}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftSummaryCard;