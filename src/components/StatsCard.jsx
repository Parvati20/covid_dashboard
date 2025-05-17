import React from 'react';
import './StatsCard.css';

function StatsCard({ title, value, percentage, color }) {
  return (
    <div className="stats-card">
      <div className="card-content" style={{ backgroundColor: color }}>
        <div className="card-info">
          <div className="card-title">{title}</div>
          <div className="card-percentage">{percentage}</div>
        </div>
      </div>
      <div className="card-value">{value}</div>
    </div>
  );
}

export default StatsCard;