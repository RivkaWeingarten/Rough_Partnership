"use client";

import { useState, useEffect } from "react";
import { totalPriceWithDiscount, formatNumberCommas } from "@/lib/utils";
import changeOptionData from "@/app/actions/updateOption";
import OptionCard from "@/components/OptionCard";
import { toast } from "react-toastify";
import getResourceNumbers from "@/app/actions/getResourceNumbers";

const updateOptionInDatabase = async (optionId, updateData) => {
  try {
    const parsedData = {
      ...updateData,
      estDiscount: updateData.estDiscount
        ? parseFloat(updateData.estDiscount)
        : updateData.estDiscount,
      estPrice: updateData.estPrice
        ? parseFloat(updateData.estPrice)
        : updateData.estPrice,
    };

    const updatedOption = await changeOptionData(optionId, parsedData);
    return updatedOption;
  } catch (error) {
    toast.error(`Error updating option: ${error.message}`);
  }
};

const OptionsSelector = ({ options }) => {
  const [activeOptionNumber, setActiveOptionNumber] = useState(null);
  const [allOptions, setAllOptions] = useState(options);
  const [sortOrder, setSortOrder] = useState("desc"); // Add sortOrder state

  const groupedOptions = allOptions.reduce((acc, option) => {
    const optionNumber = option.optionNumber;
    if (!acc[optionNumber]) {
      acc[optionNumber] = [];
    }
    acc[optionNumber].push(option);
    return acc;
  }, {});

  const handleOptionUpdate = (optionId, newData) => {
    const updatedOptions = allOptions.map((option) => {
      if (option.id === optionId) {
        updateOptionInDatabase(optionId, newData);
        return { ...option, ...newData };
      }
      return option;
    });

    setAllOptions(updatedOptions);
  };

  const resetAllOptions = () => {
    const resetOptions = allOptions.map((option) => {
      updateOptionInDatabase(option.id, { selected: false });
      return { ...option, selected: false };
    });
    setAllOptions(resetOptions);
  };

  const handleInputChange = (optionId, newDiscount) => {
    const updatedOptions = allOptions.map((option) => {
      if (option.id === optionId) {
        const newPrice = totalPriceWithDiscount(
          option.estList,
          newDiscount || option.estDiscount,
          option.estWeight
        );
        updateOptionInDatabase(optionId, {
          estDiscount: newDiscount,
          estPrice: newPrice,
        });
        return { ...option, estPrice: newPrice, estDiscount: newDiscount };
      }
      return option;
    });
    setAllOptions(updatedOptions);
  };

  const isOptionNumberPublic = () => {
    const publicOptionNumbers = new Set();
    Object.entries(groupedOptions).forEach(([optionNumber, options]) => {
      const isGroupPublic = options.some(
        (option) => option.ABC === "A" && option.isPublic
      );
      if (isGroupPublic) {
        publicOptionNumbers.add(optionNumber);
      }
    });
    return publicOptionNumbers;
  };

  const isOptionGroupPublic = isOptionNumberPublic();

  const calculateMostValuedOption = () => {
    let mostValuedOptionNumber = null;
    let highestValue = 0;
    Object.entries(groupedOptions).forEach(([optionNumber, options]) => {
      const totalEstPrice = options.reduce(
        (acc, option) => acc + option.estPrice,
        0
      );
      if (totalEstPrice > highestValue) {
        highestValue = totalEstPrice;
        mostValuedOptionNumber = optionNumber;
      }
    });
    return mostValuedOptionNumber;
  };

  const mostValuedOptionNumber = calculateMostValuedOption();

  const calculateMostValuedPublicOption = () => {
    const publicOptionNumbers = isOptionNumberPublic();
    let mostValuedOptionNumber = null;
    let highestValue = 0;
    Object.entries(groupedOptions).forEach(([optionNumber, options]) => {
      if (publicOptionNumbers.has(optionNumber)) {
        const totalEstPrice = options.reduce(
          (acc, option) => acc + option.estPrice,
          0
        );
        if (totalEstPrice > highestValue) {
          highestValue = totalEstPrice;
          mostValuedOptionNumber = optionNumber;
        }
      }
    });
    return mostValuedOptionNumber;
  };

  const mostValuedPublicOptionNumber = calculateMostValuedPublicOption();

  const isOptionNumberSelected = () => {
    let selectedOptionNumber = null;
    Object.entries(groupedOptions).forEach(([optionNumber, options]) => {
      if (options.every((option) => option.selected)) {
        selectedOptionNumber = optionNumber;
      }
    });
    return selectedOptionNumber;
  };

  const isOptionGroupSelected = isOptionNumberSelected();

  // Sorting function to sort groupedOptions based on total price
  const sortOptions =  () => {
    getResourceNumbers(options[0].resourceNumber.split("-")[0])

    const sortedOptions = Object.entries(groupedOptions).sort(
      ([, optionsA], [, optionsB]) => {
        const isPublicA = optionsA.some((option) => option.isPublic);
        const isPublicB = optionsB.some((option) => option.isPublic);
  
        // First, sort by isPublic (true comes before false)
        if (isPublicA && !isPublicB) return -1;
        if (!isPublicA && isPublicB) return 1;
  
        // If both are the same in terms of isPublic, sort by total estimated price
        const totalEstPriceA = optionsA.reduce(
          (acc, option) => acc + option.estPrice,
          0
        );
        const totalEstPriceB = optionsB.reduce(
          (acc, option) => acc + option.estPrice,
          0
        );
  
        return totalEstPriceB - totalEstPriceA; // Descending order by price
      }
    );
  
    return sortedOptions;
  };
  
  // Use sortedGroupedOptions in the component
  const sortedGroupedOptions = sortOptions();
  

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "desc" ? "desc" : "desc"));
  };

  return (
    <div>
      <button
        // onClick={() => getResourceNumbers(options[0].resourceNumber.split("-")[0])}
        onClick={() => sortOptions()  }
        className="bg-gray-200 p-2 rounded mb-4"
      >
        Sort {sortOrder === "desc" ? "Largest to Smallest" : "Smallest to Largest"}
      </button>

      <div className="flex flex-wrap -mx-2">
        { sortedGroupedOptions.map(([optionNumber, groupedOptions], index) => {
          const totalEstPrice = groupedOptions.reduce(
            (acc, option) => acc + option.estPrice,
            0
          );

          return (
            <OptionCard
              key={optionNumber}
              optionNumber={index + 1}
              options={groupedOptions}
              totalEstPrice={totalEstPrice}
              isActive={activeOptionNumber === optionNumber}
              isMostValued={optionNumber === mostValuedPublicOptionNumber}
              isSelected={optionNumber === isOptionGroupSelected}
              isPublic={isOptionGroupPublic.has(optionNumber)}
              onClick={() => setActiveOptionNumber(optionNumber)}
              onInputChange={handleInputChange}
              updateOptionInDatabase={updateOptionInDatabase}
              resetAllOptions={resetAllOptions}
              handleOptionUpdate={handleOptionUpdate}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OptionsSelector;
