"use client";
import { useState, useRef } from "react";
import OptionOnAddCrystalForm from "./OptionOnAddCrystalForm";
import updateCrystal from "@/app/actions/updateCrystal";
import options from "@/roughOptionsPrograms.json";
import { toast } from "react-toastify";
import  getRap  from "@/app/actions/getRap";

import { formatNumberCommas, totalEstPrice } from "@/lib/utils";
import OptionsSelector from "./OptionsSelector";

function EditCrystalForm({ resourceData }) {
  const formRef = useRef(null);
  const maxOptionNumber =
    resourceData.options.length > 0
      ? Math.max(...resourceData.options.map((option) => option.optionNumber))
      : 0;

  const [optionGroupNumber, setOptionGroupNumber] = useState(
    resourceData.options.length === 0 ? 0 : maxOptionNumber + 1
  );
  const [stones, setStones] = useState([{ id: "A", visible: true }]);
  // const [currentModel, setCurrentModel] = useState(1);
  const [visibleStones, setVisibleStones] = useState({});
  const [optionArray, setOptionArray] = useState(
    resourceData.options.length === 0 ? [...options] : [...resourceData.options]
  );
  const unhideStone = (letter, index) => {
    setVisibleStones((prev) => ({
      ...prev,
      [`${letter}-${index}`]: true,
    }));
  };

  // AddNewOption function
  const addNewOption = () => {
    const newOption = {
      program: "",
      estShape: "",
      company: "",
    };


    setOptionArray([...optionArray, newOption]);
    setStones([...stones, { id: "A", visible: true }]);
    setOptionGroupNumber(optionGroupNumber + 1);
  };


  const nextStonePart = (currentStonePart) => {
    let currentStonePartLetter = currentStonePart[0];
    if (currentStonePartLetter === "A") return "B";
    if (currentStonePartLetter === "B") return "C";
    if (currentStonePartLetter === "C") return "D";
    return "Only ABCD stones allowed";
  };

  // // const toggleVisibility = (id) => {
  // //   setStones(
  // //     stones.map((stone) =>
  // //       letter === id ? { ...stone, visible: !stone.visible } : stone
  // //     )
  // //   );
  // // };
  const addAction = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const letters = ["A", "B", "C", "D"];

    // Collect all option data for each stone
    const optionsDataPromises = optionArray.flatMap((stone, stoneIndex) => {
      return letters.map(async (letter) => {
        // Log start of each iteration
        console.log(`Starting Processing for Stone: ${stoneIndex}, Letter: ${letter}`);

        const estWeight = formData.get(`estWeight.${letter}.${stoneIndex}`);
        const notes = formData.get(`notes.${letter}.${stoneIndex}`);

        // If no estWeight, skip
        if (!estWeight) {
          console.log(`Skipping because estWeight is empty for Stone: ${stoneIndex}, Letter: ${letter}`);
          return null;
        }

        try {
          const programName = formData.get(`estProgram.${letter}.${stoneIndex}`);
          const program = options.find((opt) => opt.program === programName);

          if (!program) {
            console.warn(`Program not found: ${programName}`);
            return null;
          }

          const estShape = program.estShape || '';
          const estProgram = program.program || '';
          const company = program.company || '';
          const isPublic = company === "KW" ? true : false;

          // Log fetched values
          console.log(`Fetched Values for Stone: ${stoneIndex}, Letter: ${letter}`, {
            estShape,
            estProgram,
            company,
            isPublic
          });

          // Extract remaining form values
          const estColor = formData.get(`estColor.${letter}`) || formData.get("roughColor");
          const estClarity = formData.get(`estClarity.${letter}`) || formData.get("roughClarity");
          const estPlusMinusRColor = formData.get(`estPlusMinusRColor.${letter}`) || formData.get("plusMinusRColor");
          const estPlusMinusRClarity = formData.get(`estPlusMinusRClarity.${letter}`) || formData.get("plusMinusRClarity");

          // Fetch list price
          const listPrice = await getRap(estShape, estWeight, estColor, estClarity);

          // Log list price
          console.log(`Fetched List Price for Stone: ${stoneIndex}, Letter: ${letter}: ${listPrice}`);

          // Return option data
          return {
            resourceNumber: resourceData.resourceNumber,
            ABC: letter,
            optionNumber: stoneIndex + 1,
            program: estProgram,
            estShape,
            estWeight,
            estColor,
            estClarity,
            notes,
            listPrice,
            estPlusMinusRColor,
            estPlusMinusRClarity,
            company,
            isPublic,
          };
        } catch (error) {
          console.error("Error fetching price data:", error);
          return null;
        }
      });
    });

    // Await promises and log results
    const optionsData = (await Promise.all(optionsDataPromises)).flat().filter(Boolean);

    // Log the final optionsData array
    console.log("Final Options Data:", optionsData);

    // Add to formData and submit
    formData.append("optionsData", JSON.stringify(optionsData));
    console.log("Final FormData:", formData);
    const { data, error } = await updateCrystal(formData, resourceData.resourceNumber);;
    
    if (error) {
      toast.error(error);
    } else {
      toast.success(`Updated resource number: ${data.resourceNumber}`);
      formRef.current?.reset();
    }
  };
  // function addAction(event) {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   console.log(formData.get("roughWeight"));
  // }

  return (
    <>
      <section className="bg-blue-50">
      <a
            href={`/lots/${resourceData.lotNumber}`}
            className="bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700 transition"
          >
            Go to Lot {resourceData.lotNumber}
          </a>
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            {/* <form ref={formRef} onSubmit={addAction}> */}
            <form onSubmit={addAction} ref={formRef}>
              <h2 className="text-3xl text-center font-semibold mb-6">
                Editing # {resourceData.resourceNumber}
              </h2>
              <div className="mb-4 flex flex-wrap items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <label className="block text-gray-700 font-bold mb-2 sm:mb-0 sm:w-auto w-full">
                  Rough Weight
                </label>
                <input
                  type="text"
                  id="roughWeight"
                  name="roughWeight"
                  defaultValue={resourceData.roughWeight}
                  className="border rounded w-full sm:w-24 py-2 px-3"
                  placeholder="enter Rough carats"
                />
              </div>
              <div className="mb-4 flex flex-wrap items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <label className="block text-gray-700 font-bold mb-2 sm:mb-0 sm:w-auto w-full">
                  ZL Color {"  "}
                </label>
                <select
                  id="roughColor"
                  name="roughColor"
                  defaultValue={resourceData.roughColor}
                  className="border rounded w-full sm:w-20 py-2 px-3"
                  required
                >
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                  <option value="H">H</option>
                  <option value="I">I</option>
                  <option value="J">J</option>
                  <option value="K">K</option>
                  <option value="L">L</option>
                </select>

                <select
                  id="plusMinusRColor"
                  name="plusMinusRColor"
                  className="border rounded w-full sm:w-20 py-2 px-3"
                  placeholder="+-"
                  defaultValue={resourceData.plusMinusRColor}
                >
                  <option value=""></option>
                  <option value="+">+</option>
                  <option value="-">-</option>
                </select>

                <label className="block text-gray-700 font-bold mb-1 sm:mb-0 sm:w-auto w-full">
                  ZL Clarity
                </label>
                <select
                  id="roughClarity"
                  name="roughClarity"
                  className="border rounded w-full sm:w-20 py-2 px-3"
                  defaultValue={resourceData.roughClarity}
                  required
                >
                  <option value="IF">IF</option>
                  <option value="VVS1">VVS1</option>
                  <option value="VVS2">VVS2</option>
                  <option value="VS1">VS1</option>
                  <option value="VS2">VS2</option>
                  <option value="SI1">SI1</option>
                  <option value="SI2">SI2</option>
                  <option value="I1">I1</option>
                  <option value="I2">I2</option>
                </select>

                <select
                  id="plusMinusRClarity"
                  name="plusMinusRClarity"
                  className="border rounded w-full sm:w-20 py-2 px-3"
                  defaultValue={resourceData.plusMinusRClarity}
                  placeholder="+-"
                >
                  <option value=""></option>
                  <option value="+">+</option>
                  <option value="-">-</option>
                </select>
              </div>
              <div className="mb-4 flex flex-wrap items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <label className="block text-gray-700 font-bold mb-2 sm:mb-0 sm:w-auto w-full">
                  Machine Color
                </label>

                <input
                  type="text"
                  id="machineColor"
                  name="machineColor"
                  className="border rounded w-full sm:w-24 py-2 px-3"
                  defaultValue={resourceData.machineColor}
                />

                <label
                  htmlFor="type"
                  className="block text-gray-700 font-bold mb-2 sm:mb-0 sm:w-auto w-full"
                >
                  Fluorescence
                </label>
                <select
                  id="fluor"
                  name="fluor"
                  className="border rounded w-full sm:w-48 py-2 px-3"
                  defaultValue={resourceData.fluor}
                  required
                >
                  <option value="None">None</option>
                  <option value="Faint">Faint</option>
                  <option value="Medium Blue">Medium Blue</option>
                  <option value="Strong Blue">Strong Blue</option>
                  <option value="Very Strong Blue">Very Strong Blue</option>
                  <option value="Medium Yellow">Medium Yellow</option>
                  <option value="Strong Yellow">Strong Yellow</option>
                  <option value="Very Strong Yellow">Very Strong Yellow</option>
                </select>
              </div>
              <div className="mb-4 flex flex-wrap items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Notes"
                  rows={1}
                  className="border rounded w-full sm:w-30 py-2 px-3"
                  defaultValue={resourceData.roughDescription}
                />
              </div>

              <div className="mb-4">
                <span className="text-sm text-grey-500">
                  (Will inherit if left Blank) {"  "}
                </span>
                {["A", "B", "C", "D"].map((stone) => (
                  
                  <div>
                
                    <div className="mb-4 flex flex-wrap items-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <label className="block text-gray-700 font-bold mb-2 sm:mb-0 sm:w-auto w-full">
                        {stone} Color
                      </label>
                      <select
                        id={`estColor.${stone}`}
                        name={`estColor.${stone}`}
                        className="border rounded w-full sm:w-20 py-2 px-3"
                       
                      >
                        <option value=""></option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                        <option value="G">G</option>
                        <option value="H">H</option>
                        <option value="I">I</option>
                        <option value="J">J</option>
                        <option value="K">K</option>
                        <option value="L">L</option>
                      </select>

                      <select
                        id={`estPlusMinusRColor.${stone}`}
                        name={`estPlusMinusRColor.${stone}`}
                        className="border rounded w-full sm:w-20 py-2 px-3"
                        placeholder="+-"
                      >
                        <option value=""></option>
                        <option value="+">+</option>
                        <option value="-">-</option>
                      </select>

                      <label className="block text-gray-700 font-bold mb-1 sm:mb-0 sm:w-auto w-full">
                        Clarity
                      </label>
                      <select
                        id={`estClarity.${stone}`}
                        name={`estClarity.${stone}`}
                        className="border rounded w-full sm:w-20 py-2 px-3"
                      >
                        <option value=""></option>
                        <option value="IF">IF</option>
                        <option value="VVS1">VVS1</option>
                        <option value="VVS2">VVS2</option>
                        <option value="VS1">VS1</option>
                        <option value="VS2">VS2</option>
                        <option value="SI1">SI1</option>
                        <option value="SI2">SI2</option>
                        <option value="I1">I1</option>
                        <option value="I2">I2</option>
                      </select>

                      <select
                        id="estPlusMinusRClarity"
                        name="estPlusMinusRClarity"
                        className="border rounded w-full sm:w-20 py-2 px-3"
                        placeholder="+-"
                      >
                        <option value=""></option>
                        <option value="+">+</option>
                        <option value="-">-</option>
                      </select>
                    </div>
                  </div>
                ))}
        
                <div className="mb-4 bg-blue-50 p-4">
             
                  <div>
                    {resourceData.options.length === 0 ? (
                      optionArray.map((option, index) => (
                        <OptionOnAddCrystalForm
                          key={index}
                          option={option}
                          index={index}
                          options={options}
                          visibleStones={visibleStones}
                          unhideStone={unhideStone}
                          nextStonePart={nextStonePart}
                        />
                      ))
                    ) : (
                      <>
                        <p>You can edit existing options below</p>
                        {optionArray.slice(maxOptionNumber + 1).map((_, i) => (
                          <OptionOnAddCrystalForm
                            key={maxOptionNumber + i}
                            option={
                              {
                                /* Pass any default or empty values needed for the new option */
                              }
                            }
                            index={maxOptionNumber + i}
                            options={options}
                            visibleStones={visibleStones}
                            unhideStone={unhideStone}
                            nextStonePart={nextStonePart}
                          />
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={addNewOption}
                className="mt-4 py-2 px-4 bg-green-500 text-white  rounded"
              >
                Add Another Option
              </button>
     

              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Submit Rough Diamond
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <OptionsSelector options={resourceData.options} />
    </>
  );
}

export default EditCrystalForm;
