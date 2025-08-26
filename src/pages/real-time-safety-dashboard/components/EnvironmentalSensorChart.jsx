import React, { useState, useEffect } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EnvironmentalSensorChart = ({ className = '' }) => {
  const [selectedMetric, setSelectedMetric] = useState('temperature');
  const [timeRange, setTimeRange] = useState('1h');
  const [sensorData, setSensorData] = useState([]);

  const metrics = [
    {
      id: 'temperature',
      label: 'Temperature',
      icon: 'Thermometer',
      unit: '°C',
      color: '#F59E0B',
      threshold: { min: 18, max: 35 }
    },
    {
      id: 'humidity',
      label: 'Humidity',
      icon: 'Droplets',
      unit: '%',
      color: '#3B82F6',
      threshold: { min: 30, max: 70 }
    },
    {
      id: 'co2',
      label: 'CO2 Level',
      icon: 'Wind',
      unit: 'ppm',
      color: '#10B981',
      threshold: { min: 0, max: 400 }
    },
    {
      id: 'noise',
      label: 'Noise Level',
      icon: 'Volume2',
      unit: 'dB',
      color: '#EF4444',
      threshold: { min: 0, max: 85 }
    }
  ];

  const generateMockData = () => {
    const now = new Date();
    const data = [];
    const points = timeRange === '1h' ? 12 : timeRange === '6h' ? 36 : 48;
    const interval = timeRange === '1h' ? 5 : timeRange === '6h' ? 10 : 30;

    for (let i = points - 1; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * interval * 60 * 1000);
      const baseValues = {
        temperature: 22 + Math.sin(i * 0.1) * 3 + Math.random() * 2,
        humidity: 45 + Math.cos(i * 0.15) * 10 + Math.random() * 5,
        co2: 350 + Math.sin(i * 0.2) * 50 + Math.random() * 20,
        noise: 65 + Math.cos(i * 0.25) * 15 + Math.random() * 10
      };

      data?.push({
        time: timestamp?.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        timestamp,
        ...baseValues
      });
    }

    return data;
  };

  useEffect(() => {
    setSensorData(generateMockData());
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setSensorData(prev => {
        const newData = [...prev];
        const now = new Date();
        const latest = {
          time: now?.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          }),
          timestamp: now,
          temperature: 22 + Math.sin(Date.now() * 0.001) * 3 + Math.random() * 2,
          humidity: 45 + Math.cos(Date.now() * 0.0015) * 10 + Math.random() * 5,
          co2: 350 + Math.sin(Date.now() * 0.002) * 50 + Math.random() * 20,
          noise: 65 + Math.cos(Date.now() * 0.0025) * 15 + Math.random() * 10
        };
        
        newData?.push(latest);
        return newData?.slice(-48); // Keep last 48 points
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [timeRange]);

  const currentMetric = metrics?.find(m => m?.id === selectedMetric);
  const currentValue = sensorData?.length > 0 ? sensorData?.[sensorData?.length - 1]?.[selectedMetric] : 0;
  const isWithinThreshold = currentValue >= currentMetric?.threshold?.min && currentValue <= currentMetric?.threshold?.max;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              ></div>
              <span className="text-sm text-popover-foreground">
                {entry?.name}: {entry?.value?.toFixed(1)} {currentMetric?.unit}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Environmental Monitoring</h2>
        <div className="flex items-center space-x-4">
          {/* Time Range Selector */}
          <div className="flex items-center space-x-2">
            <Button
              variant={timeRange === '1h' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('1h')}
            >
              1H
            </Button>
            <Button
              variant={timeRange === '6h' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('6h')}
            >
              6H
            </Button>
            <Button
              variant={timeRange === '24h' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('24h')}
            >
              24H
            </Button>
          </div>
        </div>
      </div>
      {/* Metric Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics?.map((metric) => {
          const value = sensorData?.length > 0 ? sensorData?.[sensorData?.length - 1]?.[metric?.id] : 0;
          const isActive = selectedMetric === metric?.id;
          const isWithinRange = value >= metric?.threshold?.min && value <= metric?.threshold?.max;
          
          return (
            <button
              key={metric?.id}
              onClick={() => setSelectedMetric(metric?.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                isActive 
                  ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon 
                  name={metric?.icon} 
                  size={20} 
                  style={{ color: metric?.color }} 
                />
                <div className={`w-2 h-2 rounded-full ${isWithinRange ? 'bg-success' : 'bg-warning'}`}></div>
              </div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                {metric?.label}
              </div>
              <div className="text-lg font-bold text-foreground">
                {value?.toFixed(1)} {metric?.unit}
              </div>
            </button>
          );
        })}
      </div>
      {/* Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sensorData}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentMetric?.color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={currentMetric?.color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={selectedMetric}
              stroke={currentMetric?.color}
              strokeWidth={2}
              fill="url(#colorGradient)"
              name={currentMetric?.label}
            />
            {/* Threshold lines */}
            <Line
              type="monotone"
              dataKey={() => currentMetric?.threshold?.max}
              stroke="#EF4444"
              strokeDasharray="5 5"
              strokeWidth={1}
              dot={false}
              name="Max Threshold"
            />
            <Line
              type="monotone"
              dataKey={() => currentMetric?.threshold?.min}
              stroke="#EF4444"
              strokeDasharray="5 5"
              strokeWidth={1}
              dot={false}
              name="Min Threshold"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Current Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Activity" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Current Reading</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {currentValue?.toFixed(1)} {currentMetric?.unit}
          </div>
          <div className={`text-sm ${isWithinThreshold ? 'text-success' : 'text-warning'}`}>
            {isWithinThreshold ? 'Within normal range' : 'Outside threshold'}
          </div>
        </div>

        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Safe Range</span>
          </div>
          <div className="text-lg font-semibold text-foreground">
            {currentMetric?.threshold?.min} - {currentMetric?.threshold?.max} {currentMetric?.unit}
          </div>
        </div>

        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Last Updated</span>
          </div>
          <div className="text-lg font-semibold text-foreground">
            {sensorData?.length > 0 ? sensorData?.[sensorData?.length - 1]?.time : '--:--'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalSensorChart;