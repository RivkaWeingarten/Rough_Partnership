

import { useState,useEffect } from "react";
import { totalPriceWithDiscount } from "@/lib/utils";
import changeOptionData from "@/app/actions/updateOption";
import OptionCard from "@/components/OptionCard";
import { toast } from "react-toastify";
import { checkUser } from "@/lib/checkUser";

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



const OptionsSelector = ({ options, user }) => {
  // const [userInfo, setUserInfo] = useState(user);
  const [activeOptionNumber, setActiveOptionNumber] = useState(null);
  const [allOptions, setAllOptions] = useState([...options]);
  // const [userInfo, setUserInfo] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // New state for forcing re-render

  
  const groupedOptions = allOptions
    .reduce((acc, option) => {
      const optionNumber = option.optionNumber;
      let group = acc.find((group) => group.optionNumber === optionNumber);

      if (!group) {
        group = { optionNumber, options: [] };
        acc.push(group);
      }

      group.options.push(option);
      return acc;
    }, [])
    .sort((a, b) => {
      const isPublicA = a.options.some((option) => option.isPublic);
      const isPublicB = b.options.some((option) => option.isPublic);

      if (isPublicA && !isPublicB) return -1;
      if (!isPublicA && isPublicB) return 1;

      return 0; // Keep existing order if public status is the same
    });

  // const groupedOptions = allOptions.reduce((acc, option) => {
  //   const optionNumber = option.optionNumber;
  //   let groupIndex = acc.findIndex(
  //     (group) => group.optionNumber === optionNumber
  //   );

  //   if (groupIndex === -1) {
  //     acc.push({ optionNumber, options: [] });
  //     groupIndex = acc.length - 1;
  //   }

  //   acc[groupIndex].options.push(option);
  //   return acc;
  // }, []);

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

  // const sortOptions = () => {
  //   const sortedOptions = [...allOptions].sort((a, b) => {
  //     const isPublicA = a.isPublic;
  //     const isPublicB = b.isPublic;

  //     // First, sort by isPublic (true comes before false)
  //     if (isPublicA !== isPublicB) {
  //       return isPublicB - isPublicA;
  //     }

  //     // If both have the same isPublic value, sort by estPrice (descending)
  //     return b.estPrice - a.estPrice;
  //   });

  //   setAllOptions(sortedOptions);
  // };

  const sortOptions = () => {
    // Group options based on optionNumber
    const groupedOptions = allOptions.reduce((acc, option) => {
      const optionNumber = option.optionNumber;
      let group = acc.find((group) => group.optionNumber === optionNumber);

      if (!group) {
        group = { optionNumber, options: [] };
        acc.push(group);
      }

      group.options.push(option);
      return acc;
    }, []);

    // Sort groups first by isPublic, then by total estimated price (descending)
    const sortedOptions = groupedOptions
      .sort((a, b) => {
        // Sort by isPublic first (true comes before false)
        const isPublicA = a.options.some((option) => option.isPublic);
        const isPublicB = b.options.some((option) => option.isPublic);

        if (isPublicA && !isPublicB) return -1;
        if (!isPublicA && isPublicB) return 1;

        // Then sort by the total estimated price within the group
        const totalEstPriceA = a.options.reduce(
          (acc, option) => acc + option.estPrice,
          0
        );
        const totalEstPriceB = b.options.reduce(
          (acc, option) => acc + option.estPrice,
          0
        );

        return totalEstPriceB - totalEstPriceA; // Descending order by total estimated price
      })
      .flatMap((group) => group.options); // Flatten the grouped options back into a single array

    // Update the options state with the sorted options
    setAllOptions(sortedOptions);

    // Increment the refreshKey to trigger a re-render
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div key={refreshKey}>
      <button onClick={sortOptions} className="bg-gray-200 p-2 rounded mb-4">
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
              userCompany={user?.company}
              userRole={user?.role}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OptionsSelector;
