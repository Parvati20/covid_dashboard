
import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import './PieChart.css';

const PieChart = ({ data, stats }) => {
  if (!data || !stats) {
    return <div className="pie-chart-container">No data available for pie chart.</div>;
  }

  const totalPopulation = data.totalPopulation || 0;
  const totalCases = stats.totalCases || 0;
  const recoveries = stats.recoveries || 0;
  const deaths = stats.deaths || 0;
  const activeCases = Math.max(totalCases - recoveries - deaths, 0);
  const unaffected = Math.max(totalPopulation - totalCases, 0);

  const pieData = [
    { name: 'Unaffected', value: unaffected, color: '#F9E79F' },
    { name: 'Recovered', value: recoveries, color: '#52BE80' },
    { name: 'Deaths', value: deaths, color: '#EC7063' },
    { name: 'Active Cases', value: activeCases, color: '#5DADE2' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const val = payload[0].value;
      const formatted = val >= 1_000_000
        ? `${(val / 1_000_000).toFixed(1)}M`
        : val.toLocaleString();
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].name}: ${formatted}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="pie-chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={0}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            align="center"
            verticalAlign="bottom"
            layout="horizontal"
            formatter={(value) => <span className="legend-text">{value}</span>}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
      <div className="chart-annotation">
        <span>{`${(totalPopulation / 1_000_000).toFixed(1)}M Total Population`}</span>
      </div>
    </div>
  );
};

export default PieChart;
