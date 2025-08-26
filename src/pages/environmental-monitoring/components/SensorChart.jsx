import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SensorChart = ({ 
  title, 
  data, 
  dataKey, 
  color, 
  unit, 
  threshold,
  className = '' 
}) => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('24h');

  const timeRanges = [
    { label: '1H', value: '1h' },
    { label: '6H', value: '6h' },
    { label: '24H', value: '24h' },
    { label: '7D', value: '7d' }
  ];

  const formatXAxisTick = (tickItem) => {
    const date = new Date(tickItem);
    if (timeRange === '1h' || timeRange === '6h') {
      return date?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const date = new Date(label);
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-popover-foreground mb-1">
            {date?.toLocaleString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false 
            })}
          </p>
          <p className="text-sm text-muted-foreground">
            {title}: <span className="font-semibold text-foreground">{payload?.[0]?.value} {unit}</span>
          </p>
          {threshold && (
            <p className="text-xs text-muted-foreground mt-1">
              Threshold: {threshold} {unit}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        
        <div className="flex items-center space-x-2">
          {/* Chart Type Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={chartType === 'line' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('line')}
              className="h-8 px-3"
            >
              <Icon name="TrendingUp" size={14} />
            </Button>
            <Button
              variant={chartType === 'area' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('area')}
              className="h-8 px-3"
            >
              <Icon name="BarChart3" size={14} />
            </Button>
          </div>
          
          {/* Time Range Selector */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            {timeRanges?.map((range) => (
              <Button
                key={range?.value}
                variant={timeRange === range?.value ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeRange(range?.value)}
                className="h-8 px-3 text-xs"
              >
                {range?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={formatXAxisTick}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ value: unit, angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              {threshold && (
                <Line
                  type="monotone"
                  dataKey={() => threshold}
                  stroke="var(--color-error)"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={false}
                  name="Threshold"
                />
              )}
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={formatXAxisTick}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ value: unit, angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              {threshold && (
                <Line
                  type="monotone"
                  dataKey={() => threshold}
                  stroke="var(--color-error)"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={false}
                  name="Threshold"
                />
              )}
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                fill={`${color}20`}
                strokeWidth={2}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SensorChart;