'use client'; 

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { formatNumberCommas } from "@/lib/utils";
import getLots from "@/app/actions/getLots";

const LotStats = ({ lot }) => {
  const [lotData, setLotData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLotData = async () => {
      try {
        const { lots, error } = await getLots();
        if (error) {
          setError(error);
        } else {
          const data = lots.find((l) => l.lotName === lot);
          if (!data) {
            setError("Lot not found.");
          } else {
            setLotData(data);
          }
        }
      } catch (err) {
        setError("Failed to fetch lot data.");
      }
    };
    
    fetchLotData();
  }, [lot]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!lotData) {
    return <div>Loading...</div>;
  }

  const percOffTotalList = (100 - (lotData.totalPrice / lotData.totalTtlList) * 100).toFixed(2);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-600">Value:</span>
          <span className="text-gray-800">{formatNumberCommas(lotData.totalPrice)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-600">Total List:</span>
          <span className="text-gray-800">{formatNumberCommas(lotData.totalTtlList)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-600">List Percent:</span>
          <span className="text-gray-800">{percOffTotalList} %</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-600">Cost:</span>
          <span className="text-gray-800">{formatNumberCommas(lotData.cost)}</span>
        </div>
      </div>
    </div>
  );
};

LotStats.propTypes = {
  lot: PropTypes.string.isRequired,
};

export default LotStats;
