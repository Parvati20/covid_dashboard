const API_BASE_URL = 'https://disease.sh/v3';
const COUNTRIES_API_URL = 'https://restcountries.com/v3.1/all';

export const fetchHistoricalData = async (country = 'usa') => {
  try {
    const response = await fetch(`${API_BASE_URL}/covid-19/historical/${country}?lastdays=1500`);
    if (!response.ok) throw new Error('Failed to fetch data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
};

export const fetchCurrentData = async (country = 'usa') => {
  try {
    const response = await fetch(`${API_BASE_URL}/covid-19/countries/${country}`);
    if (!response.ok) throw new Error('Failed to fetch data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching current data:', error);
    throw error;
  }
};

export const fetchCountries = async () => {
  try {
    const response = await fetch(COUNTRIES_API_URL);
    if (!response.ok) throw new Error('Failed to fetch countries');
    return await response.json();
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};