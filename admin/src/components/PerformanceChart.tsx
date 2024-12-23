import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fadeIn } from '../utils/animations';

const ChartWrapper = styled(Card)`
  margin: 24px 0;
  border-radius: 16px;
  animation: ${fadeIn} 0.5s ease-out;
  height: 400px;

  .chart-title {
    font-family: 'Comic Sans MS', cursive;
    color: ${props => props.theme.colors.primaryBlue};
    margin-bottom: 16px;
  }
`;

export const PerformanceChart = () => {
  const data = [
    { date: '2024-01', students: 800 },
    { date: '2024-02', students: 1000 },
    { date: '2024-03', students: 1234 },
  ];

  return (
    <div className="chart-container">
      <ChartWrapper>
        <h3 className="chart-title">Student Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="students" 
              stroke="#4A90E2" 
              strokeWidth={2}
              dot={{ fill: '#4A90E2', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </div>
  );
}; 