import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WorkerStatusTable = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const workers = [
    {
      id: 'W001',
      name: 'John Martinez',
      shift: 'Morning',
      zone: 'Assembly Area',
      helmet: {
        connected: true,
        battery: 85,
        lastSync: new Date(Date.now() - 5 * 60 * 1000)
      },
      compliance: 'compliant',
      lastActivity: new Date(Date.now() - 2 * 60 * 1000),
      emergencyContact: '+1-555-0123'
    },
    {
      id: 'W002',
      name: 'Sarah Chen',
      shift: 'Morning',
      zone: 'Welding Station',
      helmet: {
        connected: true,
        battery: 42,
        lastSync: new Date(Date.now() - 1 * 60 * 1000)
      },
      compliance: 'violation',
      lastActivity: new Date(Date.now() - 1 * 60 * 1000),
      emergencyContact: '+1-555-0124'
    },
    {
      id: 'W003',
      name: 'Mike Johnson',
      shift: 'Morning',
      zone: 'Quality Control',
      helmet: {
        connected: true,
        battery: 91,
        lastSync: new Date(Date.now() - 3 * 60 * 1000)
      },
      compliance: 'compliant',
      lastActivity: new Date(Date.now() - 4 * 60 * 1000),
      emergencyContact: '+1-555-0125'
    },
    {
      id: 'W004',
      name: 'Lisa Rodriguez',
      shift: 'Morning',
      zone: 'Packaging',
      helmet: {
        connected: false,
        battery: 15,
        lastSync: new Date(Date.now() - 15 * 60 * 1000)
      },
      compliance: 'warning',
      lastActivity: new Date(Date.now() - 8 * 60 * 1000),
      emergencyContact: '+1-555-0126'
    },
    {
      id: 'W005',
      name: 'David Kim',
      shift: 'Morning',
      zone: 'Storage',
      helmet: {
        connected: true,
        battery: 67,
        lastSync: new Date(Date.now() - 2 * 60 * 1000)
      },
      compliance: 'compliant',
      lastActivity: new Date(Date.now() - 1 * 60 * 1000),
      emergencyContact: '+1-555-0127'
    },
    {
      id: 'W006',
      name: 'Emma Wilson',
      shift: 'Afternoon',
      zone: 'Assembly Area',
      helmet: {
        connected: true,
        battery: 78,
        lastSync: new Date(Date.now() - 7 * 60 * 1000)
      },
      compliance: 'compliant',
      lastActivity: new Date(Date.now() - 6 * 60 * 1000),
      emergencyContact: '+1-555-0128'
    }
  ];

  const getComplianceStatus = (compliance) => {
    switch (compliance) {
      case 'compliant':
        return { color: 'text-success', bg: 'bg-success/10', label: 'Compliant' };
      case 'violation':
        return { color: 'text-error', bg: 'bg-error/10', label: 'Violation' };
      case 'warning':
        return { color: 'text-warning', bg: 'bg-warning/10', label: 'Warning' };
      default:
        return { color: 'text-muted-foreground', bg: 'bg-muted/10', label: 'Unknown' };
    }
  };

  const getBatteryColor = (battery) => {
    if (battery > 50) return 'text-success';
    if (battery > 20) return 'text-warning';
    return 'text-error';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000 / 60);
    
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    return `${Math.floor(diff / 60)}h ago`;
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedWorkers = workers?.filter(worker => 
      worker?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      worker?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      worker?.zone?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )?.sort((a, b) => {
      let aValue = a?.[sortField];
      let bValue = b?.[sortField];
      
      if (sortField === 'battery') {
        aValue = a?.helmet?.battery;
        bValue = b?.helmet?.battery;
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return (
      <Icon 
        name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
        size={14} 
        className="text-primary" 
      />
    );
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Worker Status</h2>
        <div className="flex items-center space-x-4">
          <Input
            type="search"
            placeholder="Search workers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-64"
          />
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Worker</span>
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('zone')}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Zone</span>
                  <SortIcon field="zone" />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <span className="text-sm font-medium text-muted-foreground">Helmet Status</span>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('battery')}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Battery</span>
                  <SortIcon field="battery" />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('compliance')}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Compliance</span>
                  <SortIcon field="compliance" />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <span className="text-sm font-medium text-muted-foreground">Last Activity</span>
              </th>
              <th className="text-left py-3 px-4">
                <span className="text-sm font-medium text-muted-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedWorkers?.map((worker) => {
              const complianceStatus = getComplianceStatus(worker?.compliance);
              return (
                <tr key={worker?.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                        {worker?.name?.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{worker?.name}</div>
                        <div className="text-xs text-muted-foreground">{worker?.id} • {worker?.shift}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="MapPin" size={14} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{worker?.zone}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${worker?.helmet?.connected ? 'bg-success' : 'bg-error'}`}></div>
                      <span className="text-sm text-foreground">
                        {worker?.helmet?.connected ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Sync: {formatTimeAgo(worker?.helmet?.lastSync)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Battery" size={14} className={getBatteryColor(worker?.helmet?.battery)} />
                      <span className={`text-sm font-medium ${getBatteryColor(worker?.helmet?.battery)}`}>
                        {worker?.helmet?.battery}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${complianceStatus?.bg} ${complianceStatus?.color}`}>
                      {complianceStatus?.label}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-muted-foreground">
                      {formatTimeAgo(worker?.lastActivity)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icon name="Eye" size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icon name="MessageCircle" size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icon name="MoreHorizontal" size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {filteredAndSortedWorkers?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="Users" size={48} className="mx-auto mb-3 opacity-50" />
          <p>No workers found matching your search</p>
        </div>
      )}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing {filteredAndSortedWorkers?.length} of {workers?.length} workers</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Compliant: {workers?.filter(w => w?.compliance === 'compliant')?.length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span>Warning: {workers?.filter(w => w?.compliance === 'warning')?.length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-error rounded-full"></div>
              <span>Violation: {workers?.filter(w => w?.compliance === 'violation')?.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerStatusTable;