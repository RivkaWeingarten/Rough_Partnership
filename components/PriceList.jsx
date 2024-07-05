"use client";

import { useState } from "react";
import getRap from "@/app/actions/getRap"; // Adjust the path as per your file structure
// import formatNumberCommas from '@/app/actions/formatNumberCommas';
import { formatNumberCommas, totalPriceWithDiscount } from "@/lib/utils";
const PriceList = () => {
  const [priceData, setPriceData] = useState(null);
  const [error, setError] = useState(null);

  const fetchPriceData = async () => {
    try {
      const data = await getRap("rb", 0.9, "I", "VS1"); // Call getRap function with desired parameters
      setPriceData(data);
    } catch (error) {
      console.error("Error fetching price data:", error);
      setError("Failed to fetch price data");
    }
  };

  return (
    <div>
      <button onClick={fetchPriceData}>Fetch Price Data</button>
      {error && <p>{error}</p>}
      {priceData && (
        <div>
          <p>List per Carat: {formatNumberCommas(priceData.caratprice)}</p>
          <p>
            {" "}
            total$:{" "}
            {formatNumberCommas(
              totalPriceWithDiscount(priceData.caratprice, 30, 0.9)
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default PriceList;

// 'use client'

// import { useState } from 'react';

// const PriceList = () => {
//   const [priceData, setPriceData] = useState(null);
//   const [error, setError] = useState(null);

//   const fetchPriceData = async () => {
//     try {
//       const response = await fetch('/api/rapnet?shape=Round&size=0.18&color=d&clarity=if');
//     //   const response = await fetch('/api/rapnet');
//       const data = await response.json();
//       setPriceData(data);
//     } catch (error) {
//       console.error('Error fetching price data:', error);
//       setError('Failed to fetch price data');
//     }
//   };

//   return (
//     <div>
//       <button onClick={fetchPriceData}>Fetch Price Data</button>
//       {error && <p>{error}</p>}
//       {priceData && <pre>{JSON.stringify(priceData, null, 2)}</pre>}
//     </div>
//   );
// };

// export default PriceList;
