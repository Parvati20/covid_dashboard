import React from 'react';
import './CountrySelector.css';

function CountrySelector({ countries, selectedCountry, onChange }) {
  return (
    <div className="country-selector">
      <div className="search-container">
        <span className="search-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 21L16.65 16.65" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <select 
          className="country-dropdown"  
          value={selectedCountry}
          onChange={(e) => onChange(e.target.value)}
        >
          {countries.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}


export default CountrySelector;
