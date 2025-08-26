import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const WorkerTable = ({ 
  workers = [], 
  onWorkerSelect = () => {},
  onBulkAction = () => {},
  onRowAction = () => {},
  selectedWorkers = [],
  onSelectionChange = () => {}
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedAndFilteredWorkers = useMemo(() => {
    let filtered = workers?.filter(worker =>
      worker?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      worker?.employeeId?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      worker?.department?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        if (a?.[sortConfig?.key] < b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (a?.[sortConfig?.key] > b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [workers, searchTerm, sortConfig]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'offline':
        return 'text-muted-foreground bg-muted';
      case 'violation':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getComplianceColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const formatLastCheckIn = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000 / 60);
    
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(sortedAndFilteredWorkers?.map(w => w?.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectWorker = (workerId, checked) => {
    if (checked) {
      onSelectionChange([...selectedWorkers, workerId]);
    } else {
      onSelectionChange(selectedWorkers?.filter(id => id !== workerId));
    }
  };

  const isAllSelected = sortedAndFilteredWorkers?.length > 0 && 
    sortedAndFilteredWorkers?.every(worker => selectedWorkers?.includes(worker?.id));

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Search Bar */}
      <div className="p-4 border-b border-border">
        <Input
          type="search"
          placeholder="Search workers by name, ID, or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="max-w-md"
        />
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-12 px-4 py-3 text-left">
                <Checkbox
                  checked={isAllSelected}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Worker</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('shift')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Shift</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('helmetStatus')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Helmet Status</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('complianceScore')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Compliance</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('location')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Location</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('lastCheckIn')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Last Check-in</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedAndFilteredWorkers?.map((worker) => (
              <tr 
                key={worker?.id}
                className="hover:bg-muted/30 cursor-pointer"
                onClick={() => onWorkerSelect(worker)}
              >
                <td className="px-4 py-3" onClick={(e) => e?.stopPropagation()}>
                  <Checkbox
                    checked={selectedWorkers?.includes(worker?.id)}
                    onChange={(e) => handleSelectWorker(worker?.id, e?.target?.checked)}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                      {worker?.name?.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{worker?.name}</div>
                      <div className="text-xs text-muted-foreground">{worker?.employeeId}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-foreground">{worker?.shift}</div>
                  <div className="text-xs text-muted-foreground">{worker?.department}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(worker?.helmetStatus)}`}>
                    <div className={`w-1.5 h-1.5 rounded-full mr-1 ${
                      worker?.helmetStatus === 'active' ? 'bg-success' :
                      worker?.helmetStatus === 'violation' ? 'bg-error' : 'bg-muted-foreground'
                    }`}></div>
                    {worker?.helmetStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${getComplianceColor(worker?.complianceScore)}`}>
                      {worker?.complianceScore}%
                    </span>
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          worker?.complianceScore >= 90 ? 'bg-success' :
                          worker?.complianceScore >= 70 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${worker?.complianceScore}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-foreground">{worker?.location}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-foreground">{formatLastCheckIn(worker?.lastCheckIn)}</div>
                </td>
                <td className="px-4 py-3" onClick={(e) => e?.stopPropagation()}>
                  <div className="flex items-center justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRowAction('profile', worker)}
                      className="h-8 w-8"
                    >
                      <Icon name="User" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRowAction('message', worker)}
                      className="h-8 w-8"
                    >
                      <Icon name="MessageSquare" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRowAction('location', worker)}
                      className="h-8 w-8"
                    >
                      <Icon name="MapPin" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sortedAndFilteredWorkers?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No workers found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default WorkerTable;