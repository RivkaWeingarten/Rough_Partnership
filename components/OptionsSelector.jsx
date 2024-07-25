"use client";

import { useState } from "react";
import { totalPriceWithDiscount, formatNumberCommas } from "@/lib/utils";
import changeOptionData from "@/app/actions/updateOption";
import addDiamondRecord from "@/app/actions/addDiamond";
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
    toast.success(`Option updated successfully`);
    return updatedOption;
  } catch (error) {
    toast.error(`Error updating option: ${error.message}`);
  }
};

const OptionCard = ({
  optionNumber,
  options,
  totalEstPrice,
  isActive,
  onClick,
  onInputChange,
  updateOptionInDatabase,
}) => {
  const [inputValues, setInputValues] = useState(
    options.reduce((acc, option) => {
      acc[option.id] = option.estDiscount;
      return acc;
    }, {})
  );

  const handleInputChange = (optionId, value) => {
    setInputValues({
      ...inputValues,
      [optionId]: value,
    });
    onInputChange(optionId, value);
  };

  const handleSelectClick = async () => {
    try {
      const selectedOptions = options.map((option) => {
        updateOptionInDatabase(option.id, { selected: true });

        return {
          optionId: option.id,
          estimatedWeight: option.estWeight,
          estimatedColor: option.estColor,
          estimatedClarity: option.estClarity,
          estDiscount: parseFloat(option.estDiscount),
          estTotalPrice: parseFloat(option.estPrice),
          actTotalList: parseFloat(option.totalEstList),
          estimatedProgram: option.estProgram,
          resourceNumber: option.resourceNumber,
          location: "WDM BOTSWANA",
          isPolished: false,
          inventory: "NA",
          giaNumber: "NA",
          roughResourceNumber: option.roughResourceNumber,
        };
      });

      for (const newDiamondData of selectedOptions) {
        await addDiamondRecord(newDiamondData);
      }

      toast.success("Diamond records added successfully");
    } catch (error) {
      toast.error(`Error adding diamond record: ${error.message}`);
    }
  };

  return (
    <div
      className={`w-full bg-white rounded-lg shadow-md p-6 cursor-pointer mb-8 hover:bg-green-100 focus:outline-none focus:shadow-outline-green ${
        isActive ? "bg-green-100 shadow-outline-green" : ""
      }`}
      tabIndex="0"
      onClick={onClick}
      onKeyDown={(e) => e.key === " " && onClick()}
    >
      <div className="flex justify-between items-center mb-3">
        <h1 className="uppercase text-base tracking-wide text-blue-800 my-2">
          Option {optionNumber}
        </h1>
        {isActive && (
          <button onClick={handleSelectClick}>
            <div
              className={`bg-green-400 p-6 rounded-sm shadow-sm inline-block text-white rounded-lg px-4 py-2 hover:opacity-80`}
            >
              Select
            </div>
          </button>
        )}
      </div>

      <div className="mb-1 font-semibold text-blue-800">
        <span className="text-xl mr-2">Total Price:</span>
        <span className="text-2xl">$</span>
        <span className="text-2xl font-semibold text-blue-800">
          {formatNumberCommas(totalEstPrice)}
        </span>
      </div>

      <div className="flex flex-wrap">
        {options.map((option) => (
          <div key={option.id} className="w-1/4 p-2">
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h2 className="text-blue-800">{option.estProgram}</h2>
              <p>
                <span className="text-blue-800">{option.estWeight} Cts</span>
              </p>
              <p>
                <span className="text-blue-800">
                  -{option.estDiscount}% ${formatNumberCommas(option.estPrice)}
                </span>
              </p>
              <input
                type="number"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                value={inputValues[option.id]}
                onChange={(e) =>
                  handleInputChange(option.id, e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
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

  return (
    <div>
      {Object.entries(groupedOptions).map(
        ([optionNumber, groupedOptions]) => {
          const totalEstPrice = groupedOptions.reduce(
            (acc, option) => acc + option.estPrice,
            0
          );

          return (
            <OptionCard
              key={optionNumber}
              optionNumber={optionNumber}
              options={groupedOptions}
              totalEstPrice={totalEstPrice}
              isActive={activeOptionNumber === optionNumber}
              onClick={() => setActiveOptionNumber(optionNumber)}
              onInputChange={handleInputChange}
              updateOptionInDatabase={updateOptionInDatabase}
            />
          );
        }
      )}
    </div>
  );
};

export default OptionsSelector;
