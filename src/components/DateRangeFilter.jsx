import React, { useState } from 'react';
import './DateRangeFilter.css';

const DateRangeFilter = ({ dateRange, onApply }) => {
  const [tempRange, setTempRange] = useState(dateRange);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempRange(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApply(tempRange);
  };

  return (
    <div className="date-range-filter">
      <div className="date-filter-label">Filter by Date Range</div>
      <div className="date-filter-selector">
        <input
          type="date"
          name="start"
          value={tempRange.start}
          onChange={handleChange}
        />
        <span>to</span>
        <input
          type="date"
          name="end"
          value={tempRange.end}
          onChange={handleChange}
        />
        <button className="apply-btn" onClick={handleApply}>Apply</button>
      </div>
    </div>
  );
};

export default DateRangeFilter;
