"use client";

import { useState } from "react";
import { totalPriceWithDiscount } from "@/lib/utils";
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
    return updatedOption;
  } catch (error) {
    toast.error(`Error updating option: ${error.message}`);
  }
};

const OptionsSelector = ({ options }) => {
  const [activeOptionNumber, setActiveOptionNumber] = useState(null);
  const [allOptions, setAllOptions] = useState([...options]);

  const groupedOptions = allOptions.reduce((acc, option) => {
    const optionNumber = option.optionNumber;
    let groupIndex = acc.findIndex(group => group.optionNumber === optionNumber);

    if (groupIndex === -1) {
      acc.push({ optionNumber, options: [] });
      groupIndex = acc.length - 1;
    }

    acc[groupIndex].options.push(option);
    return acc;
  }, []);

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

  const sortOptions = () => {
    const sortedOptions = [...allOptions].sort((a, b) => {
      if (a.isPublic !== b.isPublic) {
        return b.isPublic - a.isPublic; // Public options come first
      }
      return b.estPrice - a.estPrice; // Descending by estPrice
    });

    setAllOptions(sortedOptions);
  };

  return (
    <div>
      <button
        onClick={sortOptions}
        className="bg-gray-200 p-2 rounded mb-4"
      >
        Sort by total price
      </button>

      <div className="flex flex-wrap -mx-2">
        {groupedOptions.map(({ optionNumber, options }, index) => {
          const totalEstPrice = options.reduce(
            (acc, option) => acc + option.estPrice,
            0
          );

          return (
            <OptionCard
              key={optionNumber}
              optionNumber={index + 1}
              options={options}
              totalEstPrice={totalEstPrice}
              isActive={activeOptionNumber === optionNumber}
              isPublic={options.some((option) => option.isPublic)}
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
