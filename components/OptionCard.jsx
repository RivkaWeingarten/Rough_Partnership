import React, { useState } from "react";
import { toast } from "react-toastify";
// import { addDiamondRecord } from "@/app/actions/addDiamondRecord";
import { formatNumberCommas } from "@/lib/utils";

const OptionCard = ({
  optionNumber,
  options,
  totalEstPrice,
  isActive,
  isMostValued,
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

  const handleFormSubmit = (optionId, event) => {
    event.preventDefault();
    const value = event.target.elements[0].value;
    handleInputChange(optionId, value);
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
        {isMostValued && (
          <span className="text-green-500 text-xl font-bold">$ BEST VALUE</span>
        )}
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

      <div className="mb-4 font-semibold text-blue-800">
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
              <h2 className="text-blue-800">
                <div class="w-7 h-7 font-semibold text-white rounded-full flex justify-center bg-blue-800 items-center">
                  <p>{option.ABC}</p> 
                </div>
                {/* <span className="font-semibold">{option.ABC} </span> */}
                {/* {option.estProgram} */}
                
              </h2>
              <p>
              {option.estProgram} {" "}
                <span className="text-blue-800">{option.estWeight} Cts {option.estColor} {option.plusMinusRColor} {option.estClarity} {option.plusMinusRClarity}</span>
                <span className="text-blue-800">
                  -{option.estDiscount}% ${formatNumberCommas(option.estPrice)}
                </span>
                <span className="text-blue-800">
                  {option.notes}
                </span>

                
              </p>
              <p>
                {/* <span className="text-blue-800">
                  -{option.estDiscount}% ${formatNumberCommas(option.estPrice)}
                </span>
                <span className="text-blue-800">
                  {option.notes}
                </span> */}
              </p>
              <form onSubmit={(e) => handleFormSubmit(option.id, e)}>
            <input
              type="number"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              value={inputValues[option.id]}
              onChange={(e) => setInputValues({ ...inputValues, [option.id]: e.target.value })}
            />
          </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionCard;
