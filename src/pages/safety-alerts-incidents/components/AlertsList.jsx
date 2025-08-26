import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import AlertCard from './AlertCard';

const AlertsList = ({ 
  alerts = [],
  filters = {},
  selectedAlert = null,
  onAlertSelect = () => {},
  onBulkAction = () => {},
  className = '' 
}) => {
  const [selectedAlerts, setSelectedAlerts] = useState(new Set());
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter and sort alerts
  const filteredAndSortedAlerts = useMemo(() => {
    let filtered = alerts?.filter(alert => {
      // Search filter
      if (filters?.search) {
        const searchTerm = filters?.search?.toLowerCase();
        const searchableText = `${alert?.title} ${alert?.description} ${alert?.workerName} ${alert?.location}`?.toLowerCase();
        if (!searchableText?.includes(searchTerm)) return false;
      }

      // Severity filter
      if (filters?.severity && filters?.severity !== 'all') {
        if (alert?.severity?.toLowerCase() !== filters?.severity) return false;
      }

      // Status filter
      if (filters?.status && filters?.status !== 'all') {
        if (alert?.status?.toLowerCase() !== filters?.status) return false;
      }

      // Type filter
      if (filters?.type && filters?.type !== 'all') {
        if (alert?.type?.toLowerCase() !== filters?.type) return false;
      }

      // Date range filter
      if (filters?.dateFrom) {
        const fromDate = new Date(filters.dateFrom);
        if (alert?.timestamp < fromDate) return false;
      }

      if (filters?.dateTo) {
        const toDate = new Date(filters.dateTo);
        toDate?.setHours(23, 59, 59, 999); // End of day
        if (alert?.timestamp > toDate) return false;
      }

      return true;
    });

    // Sort alerts
    filtered?.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'severity':
          const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          aValue = severityOrder?.[a?.severity?.toLowerCase()] || 0;
          bValue = severityOrder?.[b?.severity?.toLowerCase()] || 0;
          break;
        case 'status':
          const statusOrder = { open: 3, investigating: 2, resolved: 1 };
          aValue = statusOrder?.[a?.status?.toLowerCase()] || 0;
          bValue = statusOrder?.[b?.status?.toLowerCase()] || 0;
          break;
        case 'worker':
          aValue = a?.workerName?.toLowerCase();
          bValue = b?.workerName?.toLowerCase();
          break;
        case 'location':
          aValue = a?.location?.toLowerCase();
          bValue = b?.location?.toLowerCase();
          break;
        case 'timestamp':
        default:
          aValue = a?.timestamp;
          bValue = b?.timestamp;
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    return filtered;
  }, [alerts, filters, sortBy, sortOrder]);

  const handleSelectAlert = (alertId) => {
    const newSelected = new Set(selectedAlerts);
    if (newSelected?.has(alertId)) {
      newSelected?.delete(alertId);
    } else {
      newSelected?.add(alertId);
    }
    setSelectedAlerts(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedAlerts?.size === filteredAndSortedAlerts?.length) {
      setSelectedAlerts(new Set());
    } else {
      setSelectedAlerts(new Set(filteredAndSortedAlerts.map(alert => alert.id)));
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return 'ArrowUpDown';
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-foreground">
              Safety Incidents
            </h2>
            <span className="bg-muted text-muted-foreground text-sm px-2 py-1 rounded">
              {filteredAndSortedAlerts?.length} of {alerts?.length}
            </span>
          </div>
          
          {selectedAlerts?.size > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedAlerts?.size} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('assign', Array.from(selectedAlerts))}
              >
                Assign
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('status', Array.from(selectedAlerts))}
              >
                Update Status
              </Button>
            </div>
          )}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSort('timestamp')}
            className="flex items-center space-x-1 whitespace-nowrap"
          >
            <span>Date</span>
            <Icon name={getSortIcon('timestamp')} size={14} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSort('severity')}
            className="flex items-center space-x-1 whitespace-nowrap"
          >
            <span>Severity</span>
            <Icon name={getSortIcon('severity')} size={14} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSort('status')}
            className="flex items-center space-x-1 whitespace-nowrap"
          >
            <span>Status</span>
            <Icon name={getSortIcon('status')} size={14} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSort('worker')}
            className="flex items-center space-x-1 whitespace-nowrap"
          >
            <span>Worker</span>
            <Icon name={getSortIcon('worker')} size={14} />
          </Button>
        </div>

        {/* Bulk Select */}
        {filteredAndSortedAlerts?.length > 0 && (
          <div className="flex items-center space-x-2 mt-3">
            <input
              type="checkbox"
              checked={selectedAlerts?.size === filteredAndSortedAlerts?.length}
              onChange={handleSelectAll}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <span className="text-sm text-muted-foreground">
              Select all visible incidents
            </span>
          </div>
        )}
      </div>
      {/* Alerts List */}
      <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
        {filteredAndSortedAlerts?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No incidents found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search criteria to find incidents.
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {filteredAndSortedAlerts?.map((alert) => (
              <div key={alert?.id} className="relative">
                {/* Selection Checkbox */}
                <div className="absolute top-4 left-4 z-10">
                  <input
                    type="checkbox"
                    checked={selectedAlerts?.has(alert?.id)}
                    onChange={() => handleSelectAlert(alert?.id)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    onClick={(e) => e?.stopPropagation()}
                  />
                </div>
                
                {/* Alert Card */}
                <div className="ml-8">
                  <AlertCard
                    alert={alert}
                    isSelected={selectedAlert?.id === alert?.id}
                    onClick={onAlertSelect}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsList;