import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  checkResourceNumberExists,
  addDiamondRecord,
  updateDiamondRecord,
  deleteDiamondRecord
} from "@/app/actions/addDiamond";
import { formatNumberCommas } from "@/lib/utils";
import EditOptionForm from "@/components/EditOptionForm";
import getRap from "@/app/actions/getRap";
import { totalPriceWithDiscount } from "@/lib/utils";
import optionsProgram from "@/roughOptionsPrograms.json";
import { list } from "postcss";

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
  handleOptionUpdate,
}) => {
  const [inputValues, setInputValues] = useState(
    options.reduce((acc, option) => {
      acc[option.id] = option.estDiscount;
      return acc;
    }, {})
  );

  const [isOptionPublic, setIsOptionPublic] = useState(() => isPublic);
  const [isOptionMostValued, setIsOptionMostValued] = useState(
    () => isMostValued
  );
  const [isOptionGroupSelected, setIsOptionGroupSelected] = useState(
    () => isSelected
  );

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editSelectedOption, setEditSelectedOption] = useState(null);

  const handleInputChange = (optionId, value) => {
    setInputValues({
      ...inputValues,
      [optionId]: value,
    });
    onInputChange(optionId, value);
  };

  const handleDiscFormSubmit = (optionId, event) => {
    event.preventDefault();
    const value = event.target.elements[0].value;
    handleInputChange(optionId, value);
  };

  //this is to handle the public status of the option
  const handleIsPublicClick = async () => {
    try {
      // Step 1: Toggle the public status of the option
      setIsOptionPublic((prevState) => {
        const newIsPublic = !prevState;

        // Step 2: Update the public status of each option based on the new value
        options.forEach((option) => {
          handleOptionUpdate(option.id, { isPublic: newIsPublic });
        
        });
     
       // Return the new public status to update the state
     
        return newIsPublic;
    
      });


    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }

  };

  const handleSelectClick = async () => {
    try {
      // Step 1: Reset all options to select = false
      resetAllOptions();
      const countOptions = options.length;

      // Conditional logic for deleting records based on the count of selected options
      if (countOptions === 1) {
        const existsB = await checkResourceNumberExists(options[0].roughResourceNumber + "B");
        if (existsB) {
          await deleteDiamondRecord(options[0].roughResourceNumber + "B");
        }
        const existsC = await checkResourceNumberExists(options[0].roughResourceNumber + "C");
        if (existsC) {
          await deleteDiamondRecord(options[0].roughResourceNumber + "C");
        }
        const existsD = await checkResourceNumberExists(options[0].roughResourceNumber + "D");
        if (existsD) {
          await deleteDiamondRecord(options[0].roughResourceNumber + "D");
        }
      } else if (countOptions === 2) {
        const existsC = await checkResourceNumberExists(options[0].roughResourceNumber + "C");
        if (existsC) {
          await deleteDiamondRecord(options[0].roughResourceNumber + "C");
        }
        const existsD = await checkResourceNumberExists(options[0].roughResourceNumber + "D");
        if (existsD) {
          await deleteDiamondRecord(options[0].roughResourceNumber + "D");
        }
      } else if (countOptions === 3) {
        const existsD = await checkResourceNumberExists(options[0].roughResourceNumber + "D");
        if (existsD) {
          await deleteDiamondRecord(options[0].roughResourceNumber + "D");
        }
      }

      // Step 2: Set all options in the current option group to select = true
      const selectedOptions = options.map((option) => {

        handleOptionUpdate(option.id, { selected: true, isPublic: true });

        return {
          optionId: option.id,
          estimatedWeight: parseFloat(option.estWeight),
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

  const handleOpenEditPopup = (option) => {
    try {
      setEditSelectedOption(option);
      setIsEditPopupOpen(true);
    } catch (error) {
      toast.error(`Error opening edit popup: ${error.message}`);
    }
  };

  const handleCloseEditPopup = () => {
    try {
      setIsEditPopupOpen(false);
      setEditSelectedOption(null);
    } catch (error) {
      toast.error(`Error closing edit popup: ${error.message}`);
    }
  };

  const handleEditOptionSubmit = async (updatedOption) => {
    try {
      const program = optionsProgram.find(
        (opt) => opt.program === updatedOption.estProgram
      );
      const estShape = program ? program.estShape : null;
      const estProgram = program ? program.program : null;
      const company = program ? program.company : null;
      const isPublic = company === "KW" ? true : false;

      const estList = await getRap(
        estShape,
        updatedOption.estWeight,
        updatedOption.estColor,
        updatedOption.estClarity
      );

      const estPrice = totalPriceWithDiscount(
        estList.caratprice,
        updatedOption.estDiscount,
        updatedOption.estWeight
      );

      const optionWithUpdatedPrice = {
        ...updatedOption,
        estPrice,
        totalEstList: parseFloat(estList.totalListPrice.toString()),
        estList: parseFloat(estList.caratprice.toString()),
        estWeight: parseFloat(updatedOption.estWeight),
        isPublic,
        estProgram,
        company,
        estShape,
      };

      await handleOptionUpdate(
        optionWithUpdatedPrice.id,
        optionWithUpdatedPrice
      );

      setIsOptionPublic(optionWithUpdatedPrice.isPublic);
      // setIsOptionMostValued(isMostValued())
      toast.success("Option updated successfully");
    } catch (error) {
      toast.error(`Error updating option: ${error.message}`);
    }
  };

  return (
    <>
      <div
        className={`w-full p-4 lg:w-1/3 m-0.25 mb-4 bg-gray-300 rounded-lg shadow-md cursor-pointer hover:bg-green-100 focus:outline-none focus:shadow-outline-green ${
          isOptionPublic
            ? "bg-white"
            : isActive
            ? "bg-green-100 shadow-outline-green"
            : ""
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
              isOptionPublic
                ? "bg-gray-500 text-white"
                : "bg-purple-500 text-white"
            }`}
          >
            {isOptionPublic ? "Make Private" : "Share"}
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
                        <form
                          onSubmit={(e) => handleDiscFormSubmit(option.id, e)}
                        >
                          <input
                            type="number"
                            className="mt-1 p-2 border border-gray-300 rounded w-1/2"
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

                      <td className="p-1">
                        <button onClick={() => handleOpenEditPopup(option)}>
                          ✏️
                        </button>
                      </td>
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

      {isEditPopupOpen && (
        <EditOptionForm
          option={editSelectedOption}
          onClose={handleCloseEditPopup}
          onSubmit={handleEditOptionSubmit}
        />
      )}
    </>
  );
};

export default OptionCard;
