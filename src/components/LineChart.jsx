import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './LineChart.css';

function LineChart({ data }) {
  const processData = () => {
    return [
      { year: '2018', cases: 0, deaths: 0, recovered: 0 },
      { year: '2019', cases: 0.1, deaths: 0, recovered: 0.15 },
      { year: '2020', cases: 0.3, deaths: 0.2, recovered: 0.25 },
      { year: '2021', cases: 0.75, deaths: 0.5, recovered: 0.45 },
      { year: '2022', cases: 0.8, deaths: 0.3, recovered: 0.5 },
      { year: '2023', cases: 0.1, deaths: 0.1, recovered: 0.3 }
    ];
  };

  const chartData = processData();

  return (
    <div className="line-chart">
      <ResponsiveContainer width="100%" height={250}>
        <RechartsLineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="year" 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            domain={[0, 1]}
            ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="cases" 
            stroke="#6c7af3" 
            strokeWidth={2}
            dot={{ r: 4, fill: '#6c7af3' }}
          />
          <Line 
            type="monotone" 
            dataKey="deaths" 
            stroke="#f55d5d" 
            strokeWidth={2}
            dot={{ r: 4, fill: '#f55d5d' }}
          />
          <Line 
            type="monotone" 
            dataKey="recovered" 
            stroke="#4cd97b" 
            strokeWidth={2}
            dot={{ r: 4, fill: '#4cd97b' }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
      
      <div className="data-highlight">
        <div className="highlight-dot"></div>
        <p className="highlight-text">0.8 M Cases<br/>2022</p>
      </div>
    </div>
  );
}

export default LineChart;