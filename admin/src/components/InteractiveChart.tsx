import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Tooltip, Radio } from 'antd';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Legend, Tooltip as RechartsTooltip
} from 'recharts';

const ChartCard = styled(Card)`
  margin-top: 24px;
  
  .chart-controls {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .tooltip-content {
    background: white;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
  }
`;

interface DataPoint {
  date: string;
  students: number;
  revenue: number;
  courses: number;
}

interface InteractiveChartProps {
  data: DataPoint[];
}

export const InteractiveChart: React.FC<InteractiveChartProps> = ({ data }) => {
  const [chartType, setChartType] = useState('students');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="tooltip-content">
          <p>{`Date: ${label}`}</p>
          {payload.map((entry: any) => (
            <p key={entry.name} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ChartCard>
      <div className="chart-controls">
        <h3>Performance Metrics</h3>
        <Radio.Group value={chartType} onChange={e => setChartType(e.target.value)}>
          <Radio.Button value="students">Students</Radio.Button>
          <Radio.Button value="revenue">Revenue</Radio.Button>
          <Radio.Button value="courses">Courses</Radio.Button>
        </Radio.Group>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <RechartsTooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey={chartType}
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}; 