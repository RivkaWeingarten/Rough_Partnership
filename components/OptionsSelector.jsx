'use client'

import { useState } from "react";
import { totalPriceWithDiscount } from "@/lib/utils";

// Assume totalPriceWithDiscount is imported or defined above


const OptionCard = ({ option, isActive, onClick, onInputChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onInputChange(option.id, inputValue);
    }
  };
  return (
    <div
      className={`w-48 bg-white rounded-lg shadow-md p-6 cursor-pointer mb-8 hover:bg-green-100 focus:outline-none focus:shadow-outline-green ${
        isActive ? "bg-green-100 shadow-outline-green" : ""
      }`}
      tabIndex="0"
      onClick={onClick}
      onKeyDown={(e) => e.key === " " && onClick()}
    >
      
      <div className="flex justify-between items-center mb-3">
        <h1 className="uppercase text-base tracking-wide text-blue-800 my-2">
          {option.EstProgram}
        </h1>
        {isActive && (
          <svg
            className="w-6 h-6"
            width="200px"
            height="200px"
            viewBox="0 0 200 200"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="checkmark-outline" fillRule="nonzero">
                <path
                  d="M31.1442786,171.840796 C5.2779518,146.858262 -5.09578082,109.862896 4.01023318,75.0738981 C13.1162472,40.2848999 40.2848999,13.1162472 75.0738981,4.01023318 C109.862896,-5.09578082 146.858262,5.2779518 171.840796,31.1442786 C209.549474,70.1869539 209.010186,132.247241 170.628714,170.628714 C132.247241,209.010186 70.1869539,209.549474 31.1442786,171.840796 Z"
                  id="Shape"
                  fill="#97EBDC"
                ></path>
                <polygon
                  id="Path"
                  fill="#00836D"
                  points="66.6666667 89.4527363 89.5522388 112.437811 132.338308 69.6517413 146.268657 83.7810945 89.5522388 140.298507 52.7363184 103.482587 66.6666667 89.3532338"
                ></polygon>
              </g>
            </g>
          </svg>
        )}
      </div>

      <div className="mb-1 font-semibold text-blue-800">
        <span className="text-3xl mr-2">{option.estProgram}</span>
        <span className="text-2xl">@</span>
      </div>
      <div>
        <span className="text-xl font-semibold text-blue-800">{option.estWeight}</span>
        <span className="text-xl font-semibold text-blue-800"> Cts</span>
      </div>
      <div>
        <span className="text-xl text-blue-600">$</span>
        <span className="text-xl font-semibold text-blue-800">{option.totalEstList}</span>
      </div>
      <div className="mt-4">
        <label htmlFor={`input-${option.id}`} className="block text-blue-800">
          Enter Discount:
        </label>
        <input
          type="number"
          id={`input-${option.id}`}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          onChange={(e) => onInputChange(option.id, e.target.value)}
        />
        {isActive && (
          <button>
            <div className={`bg-green-400 p-6 rounded-sm shadow-sm inline-block text-white rounded-lg px-4 py-2 hover:opacity-80`}>
              Select
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

const OptionsSelector = ({ options }) => {
  const [activeOption, setActiveOption] = useState(null);
  const [optionValues, setOptionValues] = useState(
    options.reduce((acc, option) => {
      acc[option.id] = option.estDisc;
      return acc;
    }, {})
  );

  // Group options by resource number
  const groupedOptions = options.reduce((acc, option) => {
    const resourceNumber = option.resourceNumber;
    if (!acc[resourceNumber]) {
      acc[resourceNumber] = [];
    }
    acc[resourceNumber].push(option);
    return acc;
  }, {});

  const handleInputChange = (optionId, newValue) => {
    setOptionValues({
      ...optionValues,
      [optionId]: newValue,
    });

    // Update the totalEstList based on the new value
    const updatedOptions = options.map((option) => {
      if (option.id === optionId) {
        const newPrice = totalPriceWithDiscount(option.totalEstList, newValue || option.estDisc, option.estSize);
        return { ...option, totalEstList: newPrice, estDisc: newValue };
      }
      return option;
    });

    // Sort the options by totalEstList in descending order
    const sortedOptions = updatedOptions.sort((a, b) => b.totalEstList - a.totalEstList);

    // Update the options with the new totalEstList and sorted order
    // setOptions(sortedOptions);

    // Simulate updating the database (you'll need to replace this with your actual update logic)
    updateOptionInDatabase(optionId, newValue || 0, sortedOptions);

    // Show a message to the user
    alert(`Updated option ${optionId} to new discount ${newValue || 0}`);
  };

  // Simulate updating the database (replace with your actual update logic)
  const updateOptionInDatabase = (optionId, newValue, updatedOptions) => {
    console.log("Updating database for option ID:", optionId, "with new discount:", newValue);
    // Add your database update logic here
  };

  return (
    <div>
      {Object.entries(groupedOptions).map(([resourceNumber, groupedOptions]) => (
        <div key={resourceNumber} className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Resource {resourceNumber}</h2>
          <div className="flex flex-wrap">
            {groupedOptions.map((option) => (
              <label key={option.id} className="cursor-pointer">
                <input
                  type="radio"
                  name={`option-${resourceNumber}`}
                  value={option.id}
                  checked={activeOption === option.id}
                  onChange={() => setActiveOption(option.id)}
                  className="hidden"
                />
                <OptionCard
                  option={option}
                  isActive={activeOption === option.id}
                  onClick={() => setActiveOption(option.id)}
                  onInputChange={handleInputChange}
                />
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OptionsSelector;
