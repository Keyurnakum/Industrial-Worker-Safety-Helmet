import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterControls = ({ 
  filters = {},
  onFilterChange = () => {},
  onClearFilters = () => {},
  className = ""
}) => {
  const shiftOptions = [
    { value: 'all', label: 'All Shifts' },
    { value: 'morning', label: 'Morning (6AM - 2PM)' },
    { value: 'afternoon', label: 'Afternoon (2PM - 10PM)' },
    { value: 'night', label: 'Night (10PM - 6AM)' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'assembly', label: 'Assembly' },
    { value: 'quality', label: 'Quality Control' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'warehouse', label: 'Warehouse' }
  ];

  const zoneOptions = [
    { value: 'all', label: 'All Zones' },
    { value: 'zone-a', label: 'Zone A - Manufacturing' },
    { value: 'zone-b', label: 'Zone B - Assembly' },
    { value: 'zone-c', label: 'Zone C - Processing' },
    { value: 'zone-d', label: 'Zone D - Warehouse' },
    { value: 'zone-e', label: 'Zone E - Maintenance' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'offline', label: 'Offline' },
    { value: 'violation', label: 'Violation' }
  ];

  const hasActiveFilters = Object.values(filters)?.some(value => value && value !== 'all');

  return (
    <div className={`bg-card rounded-lg border border-border p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-foreground">Filter Workers</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs"
          >
            <Icon name="X" size={14} className="mr-1" />
            Clear All
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Shift"
          options={shiftOptions}
          value={filters?.shift || 'all'}
          onChange={(value) => onFilterChange('shift', value)}
          className="w-full"
        />

        <Select
          label="Department"
          options={departmentOptions}
          value={filters?.department || 'all'}
          onChange={(value) => onFilterChange('department', value)}
          className="w-full"
        />

        <Select
          label="Safety Zone"
          options={zoneOptions}
          value={filters?.zone || 'all'}
          onChange={(value) => onFilterChange('zone', value)}
          className="w-full"
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status || 'all'}
          onChange={(value) => onFilterChange('status', value)}
          className="w-full"
        />
      </div>
      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Filter" size={14} />
            <span>Active filters:</span>
            <div className="flex flex-wrap gap-1">
              {Object.entries(filters)?.map(([key, value]) => {
                if (!value || value === 'all') return null;
                const option = (() => {
                  switch (key) {
                    case 'shift':
                      return shiftOptions?.find(opt => opt?.value === value);
                    case 'department':
                      return departmentOptions?.find(opt => opt?.value === value);
                    case 'zone':
                      return zoneOptions?.find(opt => opt?.value === value);
                    case 'status':
                      return statusOptions?.find(opt => opt?.value === value);
                    default:
                      return null;
                  }
                })();
                
                return option ? (
                  <span key={key} className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
                    {option?.label}
                  </span>
                ) : null;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;