import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ReportGenerationPanel = ({ 
  onGenerateReport = () => {},
  onScheduleReport = () => {},
  className = '' 
}) => {
  const [reportConfig, setReportConfig] = useState({
    type: 'compliance',
    dateRange: 'last_30_days',
    startDate: '',
    endDate: '',
    site: 'all_sites',
    format: 'pdf',
    includeCharts: true,
    includeDetails: true
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);

  const reportTypes = [
    { value: 'compliance', label: 'Compliance Report' },
    { value: 'incident', label: 'Incident Analysis' },
    { value: 'environmental', label: 'Environmental Monitoring' },
    { value: 'worker_performance', label: 'Worker Performance' },
    { value: 'equipment_status', label: 'Equipment Status' },
    { value: 'safety_metrics', label: 'Safety Metrics Summary' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last_7_days', label: 'Last 7 Days' },
    { value: 'last_30_days', label: 'Last 30 Days' },
    { value: 'last_90_days', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const siteOptions = [
    { value: 'all_sites', label: 'All Sites' },
    { value: 'site_a', label: 'Site A - Manufacturing' },
    { value: 'site_b', label: 'Site B - Warehouse' },
    { value: 'site_c', label: 'Site C - Processing' },
    { value: 'site_d', label: 'Site D - Assembly' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'csv', label: 'CSV Data' },
    { value: 'json', label: 'JSON Data' }
  ];

  const handleConfigChange = (field, value) => {
    setReportConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      onGenerateReport(reportConfig);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleScheduleReport = () => {
    onScheduleReport(reportConfig);
    setShowScheduler(false);
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Generate Report</h2>
            <p className="text-sm text-muted-foreground">Create comprehensive safety reports</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowScheduler(!showScheduler)}
          iconName="Calendar"
          iconPosition="left"
        >
          Schedule
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Select
          label="Report Type"
          options={reportTypes}
          value={reportConfig?.type}
          onChange={(value) => handleConfigChange('type', value)}
          required
        />

        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={reportConfig?.dateRange}
          onChange={(value) => handleConfigChange('dateRange', value)}
          required
        />

        <Select
          label="Site Selection"
          options={siteOptions}
          value={reportConfig?.site}
          onChange={(value) => handleConfigChange('site', value)}
          required
        />

        {reportConfig?.dateRange === 'custom' && (
          <>
            <Input
              label="Start Date"
              type="date"
              value={reportConfig?.startDate}
              onChange={(e) => handleConfigChange('startDate', e?.target?.value)}
              required
            />
            <Input
              label="End Date"
              type="date"
              value={reportConfig?.endDate}
              onChange={(e) => handleConfigChange('endDate', e?.target?.value)}
              required
            />
          </>
        )}

        <Select
          label="Export Format"
          options={formatOptions}
          value={reportConfig?.format}
          onChange={(value) => handleConfigChange('format', value)}
          required
        />
      </div>
      {/* Report Options */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={reportConfig?.includeCharts}
            onChange={(e) => handleConfigChange('includeCharts', e?.target?.checked)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
          />
          <span className="text-sm text-foreground">Include Charts</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={reportConfig?.includeDetails}
            onChange={(e) => handleConfigChange('includeDetails', e?.target?.checked)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
          />
          <span className="text-sm text-foreground">Include Detailed Data</span>
        </label>
      </div>
      {/* Schedule Panel */}
      {showScheduler && (
        <div className="mb-6 p-4 border border-border rounded-lg bg-muted/30">
          <h3 className="text-sm font-medium text-foreground mb-3">Schedule Report</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Frequency"
              options={[
                { value: 'daily', label: 'Daily' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
                { value: 'quarterly', label: 'Quarterly' }
              ]}
              value="weekly"
              onChange={() => {}}
            />
            <Input
              label="Email Recipients"
              type="email"
              placeholder="safety@company.com"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" size="sm" onClick={() => setShowScheduler(false)}>
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleScheduleReport}>
              Schedule Report
            </Button>
          </div>
        </div>
      )}
      {/* Generate Button */}
      <div className="flex justify-end">
        <Button
          variant="default"
          onClick={handleGenerateReport}
          loading={isGenerating}
          iconName="Download"
          iconPosition="left"
          className="min-w-32"
        >
          {isGenerating ? 'Generating...' : 'Generate Report'}
        </Button>
      </div>
    </div>
  );
};

export default ReportGenerationPanel;