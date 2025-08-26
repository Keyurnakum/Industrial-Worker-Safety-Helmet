import React, { useState, useEffect } from 'react';
import TopHeader from '../../components/ui/TopHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import WorkerTable from './components/WorkerTable';
import ShiftSummaryCard from './components/ShiftSummaryCard';
import ComplianceTrendChart from './components/ComplianceTrendChart';
import QuickActionPanel from './components/QuickActionPanel';
import FilterControls from './components/FilterControls';
import WorkerProfileModal from './components/WorkerProfileModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const WorkerManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Mock worker data
  const [workers] = useState([
    {
      id: 1,
      name: "Michael Rodriguez",
      employeeId: "EMP-2024-001",
      department: "Manufacturing",
      shift: "Morning (6AM - 2PM)",
      helmetStatus: "active",
      complianceScore: 95,
      location: "Zone A - Manufacturing",
      lastCheckIn: new Date(Date.now() - 5 * 60 * 1000),
      batteryLevel: 85
    },
    {
      id: 2,
      name: "Sarah Johnson",
      employeeId: "EMP-2024-002",
      department: "Assembly",
      shift: "Morning (6AM - 2PM)",
      helmetStatus: "violation",
      complianceScore: 72,
      location: "Zone B - Assembly",
      lastCheckIn: new Date(Date.now() - 15 * 60 * 1000),
      batteryLevel: 45
    },
    {
      id: 3,
      name: "David Chen",
      employeeId: "EMP-2024-003",
      department: "Quality Control",
      shift: "Afternoon (2PM - 10PM)",
      helmetStatus: "active",
      complianceScore: 88,
      location: "Zone C - Processing",
      lastCheckIn: new Date(Date.now() - 2 * 60 * 1000),
      batteryLevel: 92
    },
    {
      id: 4,
      name: "Lisa Thompson",
      employeeId: "EMP-2024-004",
      department: "Maintenance",
      shift: "Morning (6AM - 2PM)",
      helmetStatus: "offline",
      complianceScore: 91,
      location: "Zone E - Maintenance",
      lastCheckIn: new Date(Date.now() - 45 * 60 * 1000),
      batteryLevel: 12
    },
    {
      id: 5,
      name: "James Wilson",
      employeeId: "EMP-2024-005",
      department: "Warehouse",
      shift: "Night (10PM - 6AM)",
      helmetStatus: "active",
      complianceScore: 96,
      location: "Zone D - Warehouse",
      lastCheckIn: new Date(Date.now() - 1 * 60 * 1000),
      batteryLevel: 78
    },
    {
      id: 6,
      name: "Maria Garcia",
      employeeId: "EMP-2024-006",
      department: "Manufacturing",
      shift: "Afternoon (2PM - 10PM)",
      helmetStatus: "active",
      complianceScore: 93,
      location: "Zone A - Manufacturing",
      lastCheckIn: new Date(Date.now() - 8 * 60 * 1000),
      batteryLevel: 67
    }
  ]);

  // Calculate summary statistics
  const summaryStats = {
    totalWorkers: workers?.length,
    activeWorkers: workers?.filter(w => w?.helmetStatus === 'active')?.length,
    complianceRate: Math.round(workers?.reduce((sum, w) => sum + w?.complianceScore, 0) / workers?.length),
    violations: workers?.filter(w => w?.helmetStatus === 'violation')?.length
  };

  const handleWorkerSelect = (worker) => {
    setSelectedWorker(worker);
    setShowProfileModal(true);
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'for workers:', selectedWorkers);
    // Handle bulk actions like assign shifts, send alerts, export reports
  };

  const handleRowAction = (action, worker) => {
    console.log('Row action:', action, 'for worker:', worker);
    switch (action) {
      case 'profile':
        setSelectedWorker(worker);
        setShowProfileModal(true);
        break;
      case 'message':
        // Handle send message
        break;
      case 'location':
        // Handle track location
        break;
      default:
        break;
    }
  };

  const handleQuickAction = (actionId) => {
    console.log('Quick action:', actionId);
    switch (actionId) {
      case 'emergency_alert': alert('Emergency alert sent to all workers');
        break;
      case 'shift_change':
        // Handle shift change
        break;
      case 'safety_briefing':
        // Handle safety briefing
        break;
      case 'equipment_check':
        // Handle equipment check
        break;
      case 'zone_lockdown':
        // Handle zone lockdown
        break;
      case 'export_report':
        // Handle export report
        break;
      default:
        break;
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleProfileAction = (action, worker) => {
    console.log('Profile action:', action, 'for worker:', worker);
    setShowProfileModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <TopHeader 
        onNotificationClick={() => console.log('Notifications clicked')}
        onProfileClick={() => console.log('Profile clicked')}
        onLogout={() => console.log('Logout clicked')}
      />
      {/* Sidebar */}
      <SidebarNavigation 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      {/* Main Content */}
      <main className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'
      } pt-16`}>
        <div className="p-6">
          {/* Breadcrumb */}
          <BreadcrumbTrail className="mb-6" />

          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Worker Management</h1>
              <p className="text-muted-foreground">Track worker safety compliance and manage shift assignments</p>
            </div>
            <div className="flex items-center space-x-3">
              {selectedWorkers?.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedWorkers?.length} selected
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('assign_shift')}
                  >
                    <Icon name="Clock" size={16} className="mr-2" />
                    Assign Shift
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('send_alert')}
                  >
                    <Icon name="Bell" size={16} className="mr-2" />
                    Send Alert
                  </Button>
                </div>
              )}
              <Button
                variant="default"
                onClick={() => console.log('Add worker')}
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Add Worker
              </Button>
            </div>
          </div>

          {/* Filter Controls */}
          <FilterControls
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            className="mb-6"
          />

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left Section - Worker Table */}
            <div className="xl:col-span-8">
              <WorkerTable
                workers={workers}
                onWorkerSelect={handleWorkerSelect}
                onBulkAction={handleBulkAction}
                onRowAction={handleRowAction}
                selectedWorkers={selectedWorkers}
                onSelectionChange={setSelectedWorkers}
              />
            </div>

            {/* Right Section - Summary and Actions */}
            <div className="xl:col-span-4 space-y-6">
              {/* Shift Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                <ShiftSummaryCard
                  title="Current Shift"
                  totalWorkers={summaryStats?.totalWorkers}
                  activeWorkers={summaryStats?.activeWorkers}
                  complianceRate={summaryStats?.complianceRate}
                  violations={summaryStats?.violations}
                  icon="Users"
                />
                <ShiftSummaryCard
                  title="Next Shift"
                  totalWorkers={8}
                  activeWorkers={0}
                  complianceRate={94}
                  violations={0}
                  icon="Clock"
                />
              </div>

              {/* Compliance Trend Chart */}
              <ComplianceTrendChart />

              {/* Quick Action Panel */}
              <QuickActionPanel onAction={handleQuickAction} />
            </div>
          </div>
        </div>
      </main>
      {/* Worker Profile Modal */}
      <WorkerProfileModal
        worker={selectedWorker}
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onAction={handleProfileAction}
      />
    </div>
  );
};

export default WorkerManagement;