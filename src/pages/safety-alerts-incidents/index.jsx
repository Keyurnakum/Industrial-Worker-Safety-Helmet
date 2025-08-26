import React, { useState, useEffect } from 'react';
import TopHeader from '../../components/ui/TopHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import AlertNotificationBadge from '../../components/ui/AlertNotificationBadge';
import QuickStats from './components/QuickStats';
import AlertFilters from './components/AlertFilters';
import AlertsList from './components/AlertsList';
import IncidentDetails from './components/IncidentDetails';
import Button from '../../components/ui/Button';


const SafetyAlertsIncidents = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    severity: 'all',
    status: 'all',
    type: 'all',
    dateFrom: '',
    dateTo: ''
  });

  // Mock incidents data
  const mockIncidents = [
    {
      id: 'INC-2025-001',
      title: 'Worker Not Wearing Safety Helmet',
      description: `Worker #247 was observed working in Zone C without proper safety helmet for approximately 15 minutes. The incident was detected by our automated monitoring system through helmet sensor data analysis.\n\nThe worker was immediately notified and complied with safety protocols. Initial investigation suggests the helmet may have been removed due to discomfort during high-temperature conditions.`,
      type: 'helmet_violation',
      severity: 'critical',
      status: 'investigating',
      workerName: 'Michael Rodriguez',
      workerId: '247',
      workerRole: 'Construction Worker',
      location: 'Zone C - Assembly Area',
      zone: 'Zone C',
      shift: 'Day Shift (6AM - 2PM)',
      conditions: '28°C, High humidity (85%)',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      hasPhotos: true,
      hasWitnesses: true,
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400',
          caption: 'Worker without helmet in Zone C'
        },
        {
          url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
          caption: 'Safety equipment station nearby'
        }
      ],
      timeline: [
        {
          type: 'created',
          action: 'Incident reported by automated system',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          user: 'System'
        },
        {
          type: 'investigating',
          action: 'Investigation started',
          note: 'Assigned to Safety Officer Johnson for immediate review',
          timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
          user: 'Safety Manager'
        }
      ],
      notes: [
        {
          content: 'Worker reported helmet was causing headaches due to poor fit. Recommended helmet adjustment and comfort padding.',
          author: 'Safety Officer Johnson',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: 'INC-2025-002',
      title: 'Elevated CO2 Levels Detected',
      description: `Environmental sensors in the Assembly Area detected CO2 levels reaching 480 ppm, approaching the warning threshold of 500 ppm.\n\nAll workers in the area were notified and additional ventilation was activated. Levels returned to normal within 20 minutes.`,
      type: 'environmental',
      severity: 'high',
      status: 'resolved',
      workerName: 'Sarah Chen',
      workerId: '156',
      workerRole: 'Assembly Technician',
      location: 'Assembly Area - Station 3',
      zone: 'Assembly Area',
      shift: 'Day Shift (6AM - 2PM)',
      conditions: '24°C, Normal humidity (45%)',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      hasPhotos: false,
      hasWitnesses: false,
      timeline: [
        {
          type: 'created',
          action: 'Environmental alert triggered',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          user: 'Environmental System'
        },
        {
          type: 'investigating',
          action: 'Ventilation system activated',
          timestamp: new Date(Date.now() - 3.5 * 60 * 60 * 1000),
          user: 'Facility Manager'
        },
        {
          type: 'resolved',
          action: 'CO2 levels normalized',
          note: 'Levels returned to 350 ppm, well within safe range',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          user: 'Environmental System'
        }
      ],
      notes: []
    },
    {
      id: 'INC-2025-003',
      title: 'Equipment Safety Sensor Malfunction',
      description: `Safety sensor #12 in Zone A reported inconsistent readings and failed calibration check. The sensor is responsible for monitoring worker proximity to heavy machinery.\n\nEquipment has been temporarily shut down pending sensor replacement.`,
      type: 'equipment',
      severity: 'medium',
      status: 'open',
      workerName: 'David Thompson',
      workerId: '089',
      workerRole: 'Equipment Operator',
      location: 'Zone A - Manufacturing Floor',
      zone: 'Zone A',
      shift: 'Night Shift (10PM - 6AM)',
      conditions: '22°C, Normal humidity (40%)',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      hasPhotos: true,
      hasWitnesses: false,
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
          caption: 'Malfunctioning sensor unit'
        }
      ],
      timeline: [
        {
          type: 'created',
          action: 'Sensor malfunction detected',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          user: 'Equipment Monitor'
        }
      ],
      notes: []
    },
    {
      id: 'INC-2025-004',
      title: 'Worker Unsafe Behavior - Running in Work Area',
      description: `Worker #203 was observed running through Zone B, violating safety protocols that require walking pace in all work areas.\n\nThe behavior was captured on security cameras and reported by a supervisor.`,
      type: 'behavioral',
      severity: 'low',
      status: 'investigating',
      workerName: 'Jennifer Martinez',
      workerId: '203',
      workerRole: 'Quality Inspector',
      location: 'Zone B - Quality Control',
      zone: 'Zone B',
      shift: 'Day Shift (6AM - 2PM)',
      conditions: '23°C, Normal humidity (42%)',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      hasPhotos: false,
      hasWitnesses: true,
      timeline: [
        {
          type: 'created',
          action: 'Unsafe behavior reported',
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
          user: 'Supervisor Williams'
        },
        {
          type: 'investigating',
          action: 'Reviewing security footage',
          timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
          user: 'Safety Officer Johnson'
        }
      ],
      notes: [
        {
          content: 'Worker was responding to urgent quality issue. Counseling scheduled on proper emergency response procedures.',
          author: 'Supervisor Williams',
          timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000)
        }
      ]
    }
  ];

  const handleAlertSelect = (alert) => {
    setSelectedAlert(alert);
  };

  const handleStatusUpdate = (incidentId, newStatus) => {
    console.log(`Updating incident ${incidentId} status to ${newStatus}`);
    // In a real app, this would make an API call
  };

  const handleAssignInvestigator = (incidentId) => {
    console.log(`Assigning investigator to incident ${incidentId}`);
    // In a real app, this would open an assignment modal
  };

  const handleAddNote = (incidentId, note) => {
    console.log(`Adding note to incident ${incidentId}: ${note}`);
    // In a real app, this would make an API call
  };

  const handleBulkAction = (action, selectedIds) => {
    console.log(`Performing bulk action ${action} on incidents:`, selectedIds);
    // In a real app, this would handle bulk operations
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      severity: 'all',
      status: 'all',
      type: 'all',
      dateFrom: '',
      dateTo: ''
    });
  };

  const handleNotificationClick = () => {
    console.log('Opening notifications panel');
  };

  const handleProfileClick = () => {
    console.log('Opening profile menu');
  };

  const handleLogout = () => {
    console.log('Logging out user');
  };

  const handleSiteChange = (site) => {
    console.log('Changing site to:', site);
  };

  // Auto-select first incident on load
  useEffect(() => {
    if (mockIncidents?.length > 0 && !selectedAlert) {
      setSelectedAlert(mockIncidents?.[0]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <TopHeader
        onSiteChange={handleSiteChange}
        onProfileClick={handleProfileClick}
        onLogout={handleLogout}
        onNotificationClick={handleNotificationClick}
      />

      {/* Sidebar Navigation */}
      <SidebarNavigation
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <main className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'
      } pt-16`}>
        <div className="p-6 space-y-6">
          {/* Breadcrumb */}
          <BreadcrumbTrail />

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Safety Alerts & Incidents
              </h1>
              <p className="text-muted-foreground">
                Monitor safety violations, investigate incidents, and track resolution progress
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <AlertNotificationBadge
                onAlertClick={handleNotificationClick}
                onDismissAlert={(id) => console.log('Dismissing alert:', id)}
              />
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
              >
                Report Incident
              </Button>
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
              >
                Export Report
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <QuickStats />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left Panel - Filters and Alerts List */}
            <div className="xl:col-span-5 space-y-6">
              {/* Filters */}
              <AlertFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
              />

              {/* Alerts List */}
              <AlertsList
                alerts={mockIncidents}
                filters={filters}
                selectedAlert={selectedAlert}
                onAlertSelect={handleAlertSelect}
                onBulkAction={handleBulkAction}
              />
            </div>

            {/* Right Panel - Incident Details */}
            <div className="xl:col-span-7">
              <IncidentDetails
                incident={selectedAlert}
                onStatusUpdate={handleStatusUpdate}
                onAssignInvestigator={handleAssignInvestigator}
                onAddNote={handleAddNote}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SafetyAlertsIncidents;