"use client";

import { useState, useEffect } from "react";
import { totalPriceWithDiscount, formatNumberCommas } from "@/lib/utils";
import changeOptionData from "@/app/actions/updateOption";
import OptionCard from "@/components/OptionCard";

import { toast } from "react-toastify";

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
    // toast.success(`Option updated successfully`);
    return updatedOption;
  } catch (error) {
    toast.error(`Error updating option: ${error.message}`);
  }
};

const OptionsSelector = ({ options }) => {
  const [activeOptionNumber, setActiveOptionNumber] = useState(null);
  const [allOptions, setAllOptions] = useState(options);

  const groupedOptions = allOptions.reduce((acc, option) => {
    const optionNumber = option.optionNumber;
    if (!acc[optionNumber]) {
      acc[optionNumber] = [];
    }
    acc[optionNumber].push(option);
    return acc;
  }, {});
  ("reset all options to false");
  const resetAllOptions = () => {
    const resetOptions = allOptions.map((option) => {
      updateOptionInDatabase(option.id, { selected: false }); // Update database
      return { ...option, selected: false }; // Reset state
    });

    setAllOptions(resetOptions); // Update state
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

    // Iterate over each option group to determine if it's public
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
  
  //calculate the most valued option
  const calculateMostValuedOption = () => {
    let mostValuedOptionNumber = null;
    let highestValue = 0;

    Object.entries(groupedOptions).forEach(([optionNumber, groupedOptions]) => {
      const totalEstPrice = groupedOptions.reduce(
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

  //check if a option is selected
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




  return (
    <div className="flex flex-wrap -mx-2">
      {Object.entries(groupedOptions).map(
        ([optionNumber, groupedOptions], index) => {
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
            />
          );
        }
      )}
    </div>
  );
};

export default OptionsSelector;

