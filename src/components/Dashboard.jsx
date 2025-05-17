import React, { useState, useEffect } from 'react';
import CountrySelector from './CountrySelector';
import StatsCard from './StatsCard';
import LineChart from './LineChart';
import PieChart from './PieChart';
import DateRangeFilter from './DateRangeFilter';
import { fetchHistoricalData, fetchCurrentData, fetchCountries } from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('usa');
  const [covidData, setCovidData] = useState([]);
  const [currentStats, setCurrentStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [appliedDateRange, setAppliedDateRange] = useState({
    start: '2020-01-22',  
    end: new Date().toISOString().slice(0, 10), 
  });

  useEffect(() => {
    async function getCountries() {
      try {
        const data = await fetchCountries();
        const formatted = data.map(country => ({
          value: country.cca3?.toLowerCase() || '',
          label: country.name?.common || ''
        })).filter(c => c.value && c.label);
        setCountries(formatted);
      } catch (err) {
        console.error('Failed to load countries:', err);
        setError('Failed to load country list.');
      }
    }
    getCountries();
  }, []);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const [historical, current] = await Promise.all([
          fetchHistoricalData(selectedCountry),
          fetchCurrentData(selectedCountry)
        ]);

        if (historical && historical.timeline) {
          const { cases, deaths, recovered } = historical.timeline;

          const formattedData = Object.keys(cases).map(dateStr => {
            const parts = dateStr.split('/');
            const year = '20' + parts[2];
            const month = parts[0].padStart(2, '0');
            const day = parts[1].padStart(2, '0');
            const isoDate = `${year}-${month}-${day}`;  // format to YYYY-MM-DD

            return {
              date: isoDate,
              cases: cases[dateStr],
              deaths: deaths[dateStr],
              recovered: recovered[dateStr]
            };
          }).sort((a, b) => new Date(a.date) - new Date(b.date));

          setCovidData(formattedData);
        } else {
          setCovidData([]);
        }

        setCurrentStats(current);
      } catch (err) {
        console.error('Failed to fetch COVID data:', err);
        setError('Failed to load COVID data.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [selectedCountry]);

  const handleCountryChange = (code) => setSelectedCountry(code);

  const filteredCovidData = covidData.filter(entry => {
    const date = new Date(entry.date);
    return date >= new Date(appliedDateRange.start) && date <= new Date(appliedDateRange.end);
  });

  const formatNumber = (num) => {
    if (typeof num !== 'number' || isNaN(num)) return '0';
    return num >= 1_000_000 ? (num / 1_000_000).toFixed(1) + 'M' : num.toLocaleString();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-filters">
        <CountrySelector
          countries={countries}
          selectedCountry={selectedCountry}
          onChange={handleCountryChange}
        />
        <DateRangeFilter
          dateRange={appliedDateRange}
          onApply={setAppliedDateRange}
        />
      </div>

      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading data...</div>
      ) : (
        <>
          <div className="stats-cards">
            <StatsCard
              title="Total Cases"
              value={formatNumber(currentStats?.cases ?? 0)}
              color="#6c7af3"
              percentage="100%"
            />
            <StatsCard
              title="Recoveries"
              value={formatNumber(currentStats?.recovered ?? 0)}
              color="#4cd97b"
              percentage="90.2%"
            />
            <StatsCard
              title="Deaths"
              value={formatNumber(currentStats?.deaths ?? 0)}
              color="#f55d5d"
              percentage="9.8%"
            />
          </div>

          <div className="charts">
            <div className="chart-box">
              <h3>Line Chart</h3>
              <LineChart data={filteredCovidData} />
            </div>
            <div className="chart-box">
              <h3>Pie Chart</h3>
              <PieChart
                data={{
                  totalPopulation: currentStats?.population ?? 0
                }}
                stats={{
                  totalCases: currentStats?.cases ?? 0,
                  recoveries: currentStats?.recovered ?? 0,
                  deaths: currentStats?.deaths ?? 0
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
