import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AnalyticsDashboard = ({ className = '' }) => {
  const [selectedMetric, setSelectedMetric] = useState('compliance');
  const [timeRange, setTimeRange] = useState('30_days');
  const [chartType, setChartType] = useState('bar');

  // Mock data for different metrics
  const complianceData = [
    { name: 'Week 1', compliance: 95, violations: 12, target: 98 },
    { name: 'Week 2', compliance: 92, violations: 18, target: 98 },
    { name: 'Week 3', compliance: 97, violations: 8, target: 98 },
    { name: 'Week 4', compliance: 94, violations: 15, target: 98 }
  ];

  const incidentData = [
    { name: 'Jan', critical: 2, warning: 8, minor: 15 },
    { name: 'Feb', critical: 1, warning: 12, minor: 22 },
    { name: 'Mar', critical: 3, warning: 6, minor: 18 },
    { name: 'Apr', critical: 0, warning: 9, minor: 14 },
    { name: 'May', critical: 1, warning: 11, minor: 19 },
    { name: 'Jun', critical: 2, warning: 7, minor: 16 }
  ];

  const environmentalData = [
    { name: 'Zone A', temperature: 24, humidity: 65, noise: 78, gas: 12 },
    { name: 'Zone B', temperature: 26, humidity: 58, noise: 82, gas: 8 },
    { name: 'Zone C', temperature: 23, humidity: 72, noise: 75, gas: 15 },
    { name: 'Zone D', temperature: 25, humidity: 61, noise: 80, gas: 10 }
  ];

  const workerPerformanceData = [
    { name: 'Shift 1', active: 45, compliant: 42, violations: 3 },
    { name: 'Shift 2', active: 38, compliant: 35, violations: 3 },
    { name: 'Shift 3', active: 28, compliant: 26, violations: 2 }
  ];

  const siteComparisonData = [
    { name: 'Site A', value: 95, color: '#059669' },
    { name: 'Site B', value: 88, color: '#D97706' },
    { name: 'Site C', value: 92, color: '#1E40AF' },
    { name: 'Site D', value: 97, color: '#7C3AED' }
  ];

  const metricOptions = [
    { value: 'compliance', label: 'Compliance Trends' },
    { value: 'incidents', label: 'Incident Analysis' },
    { value: 'environmental', label: 'Environmental Data' },
    { value: 'worker_performance', label: 'Worker Performance' },
    { value: 'site_comparison', label: 'Site Comparison' }
  ];

  const timeRangeOptions = [
    { value: '7_days', label: 'Last 7 Days' },
    { value: '30_days', label: 'Last 30 Days' },
    { value: '90_days', label: 'Last 90 Days' },
    { value: '1_year', label: 'Last Year' }
  ];

  const chartTypeOptions = [
    { value: 'bar', label: 'Bar Chart' },
    { value: 'line', label: 'Line Chart' },
    { value: 'pie', label: 'Pie Chart' }
  ];

  const getCurrentData = () => {
    switch (selectedMetric) {
      case 'compliance':
        return complianceData;
      case 'incidents':
        return incidentData;
      case 'environmental':
        return environmentalData;
      case 'worker_performance':
        return workerPerformanceData;
      case 'site_comparison':
        return siteComparisonData;
      default:
        return complianceData;
    }
  };

  const renderChart = () => {
    const data = getCurrentData();

    if (selectedMetric === 'site_comparison' || chartType === 'pie') {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color || `hsl(${index * 45}, 70%, 50%)`} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === 'line') {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-popover)', 
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }} 
            />
            <Legend />
            {selectedMetric === 'compliance' && (
              <>
                <Line type="monotone" dataKey="compliance" stroke="var(--color-success)" strokeWidth={2} />
                <Line type="monotone" dataKey="violations" stroke="var(--color-error)" strokeWidth={2} />
                <Line type="monotone" dataKey="target" stroke="var(--color-muted-foreground)" strokeDasharray="5 5" />
              </>
            )}
            {selectedMetric === 'incidents' && (
              <>
                <Line type="monotone" dataKey="critical" stroke="var(--color-error)" strokeWidth={2} />
                <Line type="monotone" dataKey="warning" stroke="var(--color-warning)" strokeWidth={2} />
                <Line type="monotone" dataKey="minor" stroke="var(--color-primary)" strokeWidth={2} />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
          <YAxis stroke="var(--color-muted-foreground)" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--color-popover)', 
              border: '1px solid var(--color-border)',
              borderRadius: '8px'
            }} 
          />
          <Legend />
          {selectedMetric === 'compliance' && (
            <>
              <Bar dataKey="compliance" fill="var(--color-success)" />
              <Bar dataKey="violations" fill="var(--color-error)" />
            </>
          )}
          {selectedMetric === 'incidents' && (
            <>
              <Bar dataKey="critical" fill="var(--color-error)" />
              <Bar dataKey="warning" fill="var(--color-warning)" />
              <Bar dataKey="minor" fill="var(--color-primary)" />
            </>
          )}
          {selectedMetric === 'environmental' && (
            <>
              <Bar dataKey="temperature" fill="var(--color-error)" />
              <Bar dataKey="humidity" fill="var(--color-primary)" />
              <Bar dataKey="noise" fill="var(--color-warning)" />
              <Bar dataKey="gas" fill="var(--color-accent)" />
            </>
          )}
          {selectedMetric === 'worker_performance' && (
            <>
              <Bar dataKey="active" fill="var(--color-primary)" />
              <Bar dataKey="compliant" fill="var(--color-success)" />
              <Bar dataKey="violations" fill="var(--color-error)" />
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="flex items-center space-x-3 mb-4 lg:mb-0">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Analytics Dashboard</h2>
            <p className="text-sm text-muted-foreground">Interactive safety data visualization</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Select
            options={metricOptions}
            value={selectedMetric}
            onChange={setSelectedMetric}
            className="min-w-48"
          />
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="min-w-32"
          />
          <Select
            options={chartTypeOptions}
            value={chartType}
            onChange={setChartType}
            className="min-w-32"
          />
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Compliance Rate</p>
              <p className="text-2xl font-bold text-success">94.5%</p>
            </div>
            <Icon name="TrendingUp" size={20} className="text-success" />
          </div>
        </div>
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Incidents</p>
              <p className="text-2xl font-bold text-warning">7</p>
            </div>
            <Icon name="AlertTriangle" size={20} className="text-warning" />
          </div>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Workers Online</p>
              <p className="text-2xl font-bold text-primary">142</p>
            </div>
            <Icon name="Users" size={20} className="text-primary" />
          </div>
        </div>
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Critical Alerts</p>
              <p className="text-2xl font-bold text-error">2</p>
            </div>
            <Icon name="AlertCircle" size={20} className="text-error" />
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="bg-muted/30 rounded-lg p-4">
        {renderChart()}
      </div>

      {/* Chart Actions */}
      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="outline" size="sm" iconName="Download">
          Export Chart
        </Button>
        <Button variant="outline" size="sm" iconName="Maximize2">
          Full Screen
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;