import React, { useState } from 'react';
import { formatNumberCommas } from '@/lib/utils'; // Utility function for formatting numbers
import EditOptionForm from './EditOptionForm'; // Popup form for editing options
import { toast } from 'react-toastify'; // For toast notifications

const OptionsTableComponent = ({ options, onInputChange, handleOptionUpdate, optionsProgram, getRap, totalPriceWithDiscount }) => {
  // State to manage the input values for each option's discount
  const [inputValues, setInputValues] = useState(
    options.reduce((acc, option) => {
      acc[option.id] = option.estDiscount;
      return acc;
    }, {})
  );
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); // State to manage the visibility of the edit popup


  // State to manage the currently selected option for editing
  const [editSelectedOption, setEditSelectedOption] = useState(null);

  // Handle form submission for updating discounts
  const handleDiscFormSubmit = (optionId, event) => {
    event.preventDefault();
    const value = event.target.elements[0].value;
    setInputValues({
      ...inputValues,
      [optionId]: value,
    });
    onInputChange(optionId, value); // Call parent handler if provided
  };

  // Open the edit popup with the selected option
  const handleOpenEditPopup = (option) => {
    setEditSelectedOption(option);
    setIsEditPopupOpen(true);
  };

  // Close the edit popup
  const handleCloseEditPopup = () => {
    setIsEditPopupOpen(false);
    setEditSelectedOption(null);
  };

  // Handle the submission of the edit form with updated option data
  const handleEditOptionSubmit = async (updatedOption) => {
    try {
      const program = optionsProgram.find(
        (opt) => opt.program === updatedOption.estProgram
      );
      const estShape = program ? program.estShape : null;
      const estProgram = program ? program.program : null;
      const company = program ? program.company : null;
      const isPublic = company === 'KW';

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

      await handleOptionUpdate(optionWithUpdatedPrice.id, optionWithUpdatedPrice);

      toast.success('Option updated successfully');
      handleCloseEditPopup(); // Close popup after successful update
    } catch (error) {
      toast.error(`Error updating option: ${error.message}`);
    }
  };

  return (
    <>
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
                    <form onSubmit={(e) => handleDiscFormSubmit(option.id, e)}>
                      <input
                        type="number"
                        className="mt-1 p-2 border border-gray-300 rounded w-1/2"
                        value={inputValues[option.id] || ''}
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
                  <td className="p-1">${formatNumberCommas(option.estPrice)}</td>
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
                <td className="p-1"></td>
              </tr>
            </tbody>
          </table>
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

export default OptionsTableComponent;
