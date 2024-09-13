import React from "react";
import PropTypes from "prop-types";
import { formatNumberCommas } from "@/lib/utils";
import getLots from "@/app/actions/getLots";

// Reusable LotStats Component to display lot values
const LotStats = ({ lot }) => {
  
  // Calculate percentage difference between total price and total list
  const percentageDifference = (100 - (lot.totalPrice / lot.totalTtlList) * 100).toFixed(2);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-600">Value:</span>
          <span className="text-gray-800">{formatNumberCommas(lot.totalPrice)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-600">Total List:</span>
          <span className="text-gray-800">{formatNumberCommas(lot.totalTtlList)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-600">Difference:</span>
          <span className="text-gray-800">{percentageDifference} %</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-600">Cost:</span>
          <span className="text-gray-800">{formatNumberCommas(lot.totalCost)}</span>
        </div>
      </div>
    </div>
  );
};

// PropTypes for validation
LotStats.propTypes = {
  lot: PropTypes.shape({
    totalPrice: PropTypes.number.isRequired,
    totalTtlList: PropTypes.number.isRequired,
    totalCost: PropTypes.number.isRequired,
  }).isRequired,
};

export default LotStats;
