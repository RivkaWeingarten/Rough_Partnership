import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  checkResourceNumberExists,
  addDiamondRecord,
  updateDiamondRecord,
} from "@/app/actions/addDiamond";
import { formatNumberCommas } from "@/lib/utils";


const OptionCard = ({
  optionNumber,
  options,
  totalEstPrice,
  isActive,
  isMostValued,
  isSelected,
  isPublic,
  onClick,
  onInputChange,
  updateOptionInDatabase,
  resetAllOptions,

}) => {
  
  const [inputValues, setInputValues] = useState(
    options.reduce((acc, option) => {
      acc[option.id] = option.estDiscount;
      return acc;
    }, {})
  );

  const [isOptionPublic, setIsOptionPublic] = useState(() => isPublic);
  const [isOptionMostValued, setIsOptionMostValued] = useState(() => isMostValued);
  const [isOptionGroupSelected, setIsOptionGroupSelected] = useState(() => isSelected);
  
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

  //this is to handle the public status of the option
  const handleIsPublicClick = async () => {
    try {
      // Step 1: Toggle the public status of the option
      setIsOptionPublic(prevState => {
        const newIsPublic = !prevState;
  
        // Step 2: Update the public status of each option based on the new value
        options.forEach(option => {
          updateOptionInDatabase(option.id, { isPublic: newIsPublic });
        });
  
        // Return the new public status to update the state
        return newIsPublic;
      });
  
      // If you need to do something with the publicOptions, handle it here
      // For example, if you need to prepare a list of options:
      const publicOptions = options.map(option => ({
        optionId: option.id,
        estimatedWeight: option.estWeight,
        estimatedColor: option.estColor,
        estimatedClarity: option.estClarity,
        estDiscount: parseFloat(option.estDiscount),
        estTotalPrice: parseFloat(option.estPrice),
        actTotalList: parseFloat(option.totalEstList),
        estimatedProgram: option.estProgram,
        resourceNumber: option.resourceNumber,
        company: option.company,
        location: "WDM BOTSWANA",
        isPolished: false,
        inventory: "NA",
        giaNumber: "NA",
        roughResourceNumber: option.roughResourceNumber,
      }));
  
      // Optionally, you can use `publicOptions` here
  
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };
 
      
   
  
  const handleSelectClick = async () => {
    try {
      // Step 1: Reset all options to select = false
      resetAllOptions();

      // Step 2: Set all options in the current option group to select = true
      const selectedOptions = options.map((option) => {
        updateOptionInDatabase(option.id, { selected: true, isPublic: true });

        return {
          optionId: option.id,
          estimatedWeight: option.estWeight,
          estimatedShape: option.estShape,
          estimatedColor: option.estColor,
          estimatedClarity: option.estClarity,
          estDiscount: parseFloat(option.estDiscount),
          estTotalPrice: parseFloat(option.estPrice),
          actTotalList: parseFloat(option.totalEstList),
          estimatedProgram: option.estProgram,
          resourceNumber: option.resourceNumber,
          company: option.company,
          location: "WDM BOTSWANA",
          isPolished: false,
          inventory: "NA",
          giaNumber: "NA",
          roughResourceNumber: option.roughResourceNumber,
        };
      });

      //  Step 3: Update Diamonds table
      for (const option of selectedOptions) {
        const exists = await checkResourceNumberExists(option.resourceNumber); // Assume this function is defined
        if (exists) {
          await updateDiamondRecord(option.resourceNumber, option);
        } else {
          await addDiamondRecord(option);
        }
      }

      toast.success("Diamond records added successfully");

      setIsOptionGroupSelected(true);
    } catch (error) {
      toast.error(`Error adding diamond record: ${error.message}`);
    }
   

  };
  return (
    <>
      <div
    className={`w-full p-4 lg:w-1/3 m-0.25 mb-4 bg-gray-200 rounded-lg shadow-md cursor-pointer hover:bg-green-100 focus:outline-none focus:shadow-outline-green ${
      isOptionPublic ? "bg-white" : isActive ? "bg-green-100 shadow-outline-green" : ""
    }`}
        tabIndex="0"
        onClick={onClick}
        onKeyDown={(e) => e.key === " " && onClick()}
      >
        <div>
          {isOptionGroupSelected ? (
            <div className="inline-block w-5 h-5 rounded-full bg-green-500 text-white text-center leading-5 font-bold">
              ✓
            </div>
          ) : (
            ""
          )}
        </div>
        
        <div className=" flex justify-between items-center mb-2 ">
          <h1 className="uppercase text-sm tracking-wide text-blue-800">
            Option {optionNumber}
          </h1>

          <button
              onClick={handleIsPublicClick}
              className={`px-2 py-1 text-xs rounded-md ${
                // isOptionPublic ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                isOptionPublic ? 'bg-gray-500 text-white' : 'bg-green-500 text-white'
              }`}
            >
              {isOptionPublic ? 'Hide' : 'Share'}
            </button>
          {isMostValued && (
            <span className="text-green-500 text-sm font-bold">
              $ BEST VALUE
            </span>
          )}
          {isActive && (
            <button onClick={handleSelectClick}>
              <div className="bg-green-400 p-2 rounded-sm shadow-sm inline-block text-white rounded-lg px-2 py-1 hover:opacity-80">
                Select
              </div>
            </button>
          )}
        </div>

        <div className="mb-2 font-semibold text-blue-800 text-sm">
          <span className="text-sm mr-1">Total Price:</span>
          <span className="text-lg">$</span>
          <span className="text-lg font-semibold text-blue-800">
            {formatNumberCommas(totalEstPrice)}
          </span>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full p-1">
            <div className="bg-gray-100 p-2 rounded-lg shadow-sm text-xs">
              <table className="w-full text-left">
                <tbody>
                  {options.map((option) => (
                    <tr key={option.id}>
                      <td className="p-1 font-bold">{option.ABC}</td>
                      <td className="p-1">
                        {option.estColor} {option.plusMinusRColor}
                      </td>
                      <td className="p-1">
                        {option.estClarity} {option.plusMinusRClarity}
                      </td>
                      <td className="p-1 font-bold">
                        {option.estProgram} @ {option.estWeight}
                      </td>

                      <td className="p-1">{option.estNotes}</td>
                      <td className="p-1">
                        <form onSubmit={(e) => handleFormSubmit(option.id, e)}>
                          <input
                            type="number"
                            className="mt-1 p-2 border border-gray-300 rounded w-1/3"
                            value={inputValues[option.id]}
                            onChange={(e) =>
                              setInputValues({
                                ...inputValues,
                                [option.id]: e.target.value,
                              })
                            }
                          />
                        </form>
                      </td>
                      <td className="p-1">{option.estDiscount}%</td>
                      <td className="p-1">
                        ${formatNumberCommas(option.estPrice)}
                      </td>
                      <td className="p-1">{option.notes}</td>
                    </tr>
                  ))}
                  <tr className="font-semibold">
                    <td className="p-1" colSpan="7">
                      Total:
                    </td>
                    <td className="p-1">
                      ${formatNumberCommas(totalEstPrice)}
                    </td>
                    <td className="p-1"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OptionCard;
