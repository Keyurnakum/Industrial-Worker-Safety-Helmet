import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ComplianceTrendChart = ({ 
  data = [],
  className = ""
}) => {
  // Default mock data if none provided
  const defaultData = [
    { time: '06:00', compliance: 95, violations: 2 },
    { time: '08:00', compliance: 92, violations: 4 },
    { time: '10:00', compliance: 88, violations: 6 },
    { time: '12:00', compliance: 85, violations: 8 },
    { time: '14:00', compliance: 90, violations: 5 },
    { time: '16:00', compliance: 93, violations: 3 },
    { time: '18:00', compliance: 96, violations: 2 }
  ];

  const chartData = data?.length > 0 ? data : defaultData;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-elevation-2 p-3">
          <p className="text-sm font-medium text-popover-foreground mb-2">{`Time: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.dataKey === 'compliance' ? 'Compliance' : 'Violations'}: ${entry?.value}${entry?.dataKey === 'compliance' ? '%' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-foreground">Compliance Trend</h3>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Compliance</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-error rounded-full"></div>
            <span className="text-muted-foreground">Violations</span>
          </div>
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="compliance" 
              stroke="var(--color-success)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 4, stroke: 'var(--color-success)', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="violations" 
              stroke="var(--color-error)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-error)', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 4, stroke: 'var(--color-error)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div className="bg-success/10 rounded-lg p-2">
          <div className="text-lg font-bold text-success">
            {chartData?.[chartData?.length - 1]?.compliance || 0}%
          </div>
          <div className="text-xs text-muted-foreground">Current Rate</div>
        </div>
        <div className="bg-error/10 rounded-lg p-2">
          <div className="text-lg font-bold text-error">
            {chartData?.[chartData?.length - 1]?.violations || 0}
          </div>
          <div className="text-xs text-muted-foreground">Active Issues</div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceTrendChart;