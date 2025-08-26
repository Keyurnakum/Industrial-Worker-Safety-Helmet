import React, { useState } from 'react';
import TopHeader from '../../components/ui/TopHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import ReportGenerationPanel from './components/ReportGenerationPanel';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ReportPreviewPanel from './components/ReportPreviewPanel';
import SavedReportsTemplates from './components/SavedReportsTemplates';

const SafetyReportsAnalytics = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [generatedReports, setGeneratedReports] = useState([]);
  const [currentReportConfig, setCurrentReportConfig] = useState(null);

  const handleGenerateReport = (config) => {
    const newReport = {
      id: Date.now(),
      name: `${config?.type?.replace('_', ' ')?.toUpperCase()} Report - ${new Date()?.toLocaleDateString()}`,
      type: config?.type,
      generatedDate: new Date(),
      size: `${(Math.random() * 3 + 0.5)?.toFixed(1)} MB`,
      format: config?.format?.toUpperCase(),
      status: 'completed',
      description: `Generated report for ${config?.site} covering ${config?.dateRange} period with ${config?.format} format.`,
      config
    };

    setGeneratedReports(prev => [newReport, ...prev]);
    
    // Simulate download
    setTimeout(() => {
      alert(`Report "${newReport?.name}" has been generated and is ready for download.`);
    }, 1000);
  };

  const handleScheduleReport = (config) => {
    alert(`Report scheduled successfully! You will receive "${config?.type}" reports via email.`);
  };

  const handleExportReport = (report) => {
    alert(`Exporting "${report?.name}" in ${report?.format} format...`);
  };

  const handleDeleteReport = (reportId) => {
    if (confirm('Are you sure you want to delete this report?')) {
      setGeneratedReports(prev => prev?.filter(report => report?.id !== reportId));
    }
  };

  const handleViewReport = (report) => {
    alert(`Opening "${report?.name}" for preview...`);
  };

  const handleLoadTemplate = (templateConfig) => {
    setCurrentReportConfig(templateConfig);
    alert('Template loaded! Report configuration has been updated.');
  };

  const handleSaveTemplate = (template) => {
    alert(`Template "${template?.name}" saved successfully!`);
  };

  const handleDeleteTemplate = (templateId) => {
    if (confirm('Are you sure you want to delete this template?')) {
      alert('Template deleted successfully!');
    }
  };

  const handleSiteChange = (site) => {
    console.log('Site changed to:', site);
  };

  const handleProfileClick = () => {
    alert('Opening profile settings...');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      alert('Logging out...');
    }
  };

  const handleNotificationClick = () => {
    alert('Opening notifications panel...');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <TopHeader
        currentUser={{ name: 'Safety Manager', role: 'Compliance Officer' }}
        alertCount={3}
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
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-60'
      }`}>
        <div className="p-6">
          {/* Breadcrumb */}
          <BreadcrumbTrail className="mb-6" />

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Safety Reports & Analytics
            </h1>
            <p className="text-muted-foreground">
              Generate comprehensive safety reports, analyze trends, and demonstrate regulatory compliance through data visualization.
            </p>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Left Sidebar - Templates and Filters */}
            <div className="xl:col-span-1">
              <SavedReportsTemplates
                onLoadTemplate={handleLoadTemplate}
                onSaveTemplate={handleSaveTemplate}
                onDeleteTemplate={handleDeleteTemplate}
                className="sticky top-24"
              />
            </div>

            {/* Main Content Area */}
            <div className="xl:col-span-3 space-y-6">
              {/* Report Generation Panel */}
              <ReportGenerationPanel
                onGenerateReport={handleGenerateReport}
                onScheduleReport={handleScheduleReport}
              />

              {/* Analytics Dashboard */}
              <AnalyticsDashboard />

              {/* Report Preview Panel */}
              <ReportPreviewPanel
                reports={generatedReports}
                onExportReport={handleExportReport}
                onDeleteReport={handleDeleteReport}
                onViewReport={handleViewReport}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SafetyReportsAnalytics;