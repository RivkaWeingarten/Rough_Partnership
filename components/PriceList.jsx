'use client'

import { useState } from 'react';

const PriceList = () => {
  const [priceData, setPriceData] = useState(null);
  const [error, setError] = useState(null);

  const fetchPriceData = async () => {
    try {
      const response = await fetch('/api/rapnet?shape=Round&size=0.18&color=d&clarity=if');
    //   const response = await fetch('/api/rapnet');
      const data = await response.json();
      setPriceData(data);
    } catch (error) {
      console.error('Error fetching price data:', error);
      setError('Failed to fetch price data');
    }
  };

  

  return (
    <div>
      <button onClick={fetchPriceData}>Fetch Price Data</button>
      {error && <p>{error}</p>}
      {priceData && <pre>{JSON.stringify(priceData, null, 2)}</pre>}
    </div>
  );
};

export default PriceList;
