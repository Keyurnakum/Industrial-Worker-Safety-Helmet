import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AlertFilters = ({ 
  filters = {},
  onFiltersChange = () => {},
  onClearFilters = () => {},
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const severityOptions = [
    { value: 'all', label: 'All Severities', count: 24 },
    { value: 'critical', label: 'Critical', count: 3 },
    { value: 'high', label: 'High', count: 7 },
    { value: 'medium', label: 'Medium', count: 9 },
    { value: 'low', label: 'Low', count: 5 }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status', count: 24 },
    { value: 'open', label: 'Open', count: 8 },
    { value: 'investigating', label: 'Investigating', count: 11 },
    { value: 'resolved', label: 'Resolved', count: 5 }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types', count: 24 },
    { value: 'helmet_violation', label: 'Helmet Violation', count: 12 },
    { value: 'environmental', label: 'Environmental', count: 6 },
    { value: 'equipment', label: 'Equipment', count: 4 },
    { value: 'behavioral', label: 'Behavioral', count: 2 }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters)?.filter(value => value && value !== 'all')?.length;
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Filters</h3>
          {getActiveFiltersCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
              {getActiveFiltersCount()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <div className="p-4 space-y-6">
          {/* Search */}
          <div>
            <Input
              type="search"
              placeholder="Search incidents..."
              value={filters?.search || ''}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              label="From Date"
              value={filters?.dateFrom || ''}
              onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
            />
            <Input
              type="date"
              label="To Date"
              value={filters?.dateTo || ''}
              onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
            />
          </div>

          {/* Severity Filter */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Severity</h4>
            <div className="space-y-2">
              {severityOptions?.map((option) => (
                <label key={option?.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="severity"
                    value={option?.value}
                    checked={filters?.severity === option?.value || (!filters?.severity && option?.value === 'all')}
                    onChange={(e) => handleFilterChange('severity', e?.target?.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-foreground flex-1">{option?.label}</span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {option?.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Status</h4>
            <div className="space-y-2">
              {statusOptions?.map((option) => (
                <label key={option?.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={option?.value}
                    checked={filters?.status === option?.value || (!filters?.status && option?.value === 'all')}
                    onChange={(e) => handleFilterChange('status', e?.target?.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-foreground flex-1">{option?.label}</span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {option?.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Incident Type</h4>
            <div className="space-y-2">
              {typeOptions?.map((option) => (
                <label key={option?.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value={option?.value}
                    checked={filters?.type === option?.value || (!filters?.type && option?.value === 'all')}
                    onChange={(e) => handleFilterChange('type', e?.target?.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-foreground flex-1">{option?.label}</span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {option?.count}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertFilters;