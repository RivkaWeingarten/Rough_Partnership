"use client";
import React, { useState, useRef } from "react";

import options from "@/roughOptionsPrograms.json";
import { toast } from "react-toastify";
import addCrystal from "@/app/actions/addCrystal";
import getRap from "@/app/actions/getRap";
import OptionOnAddCrystalForm from "./OptionOnAddCrystalForm";

function AddCrystalForm({ lotName }) {
  const formRef = useRef(null);
  const [stones, setStones] = useState([{ id: "A", visible: true }]);
  const [currentModel, setCurrentModel] = useState(1);
  const [visibleStones, setVisibleStones] = useState({});
  const [optionArray, setOptionArray] = useState([...options]);
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

    setOptionArray([...optionArray, newOption]); // Use setState to add a new option
    setStones([...stones, { id: "A", visible: true }]); // Add a new stone option
  };

  const nextModel = () => {
    setCurrentModel((prevModel) => prevModel + 1);
  };

  const nextStonePart = (currentStonePart) => {
    let currentStonePartLetter = currentStonePart[0];
    if (currentStonePartLetter === "A") return "B";
    if (currentStonePartLetter === "B") return "C";
    if (currentStonePartLetter === "C") return "D";
    return "Only ABCD stones allowed";
  };

  // const toggleVisibility = (id) => {
  //   setStones(
  //     stones.map((stone) =>
  //       letter === id ? { ...stone, visible: !stone.visible } : stone
  //     )
  //   );
  // };
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
          const program = optionArray.find((opt) => opt.program === programName);
  
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
  
    const { data, error } = await addCrystal(formData, lotName);
    if (error) {
      toast.error(error);
    } else {
      toast.success(`Added resource number: ${data.resourceNumber}`);
      formRef.current?.reset();
    }
  };
  
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form ref={formRef} onSubmit={addAction}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Add Rough to Lot # {lotName}
            </h2>
            <div className="mb-4 flex flex-wrap items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <label className="block text-gray-700 font-bold mb-2 sm:mb-0 sm:w-auto w-full">
                Resource Number
              </label>
              <input
                type="text"
                id="resourceNumber"
                name="resourceNumber"
                className="border rounded w-full sm:w-24 py-2 px-3"
                placeholder={`${lotName}-enter only number`}
                required
              />
              <label className="block text-gray-700 font-bold mb-2 sm:mb-0 sm:w-auto w-full">
                Rough Weight
              </label>
              <input
                type="text"
                id="roughWeight"
                name="roughWeight"
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
              />
            </div>

            <div className="mb-4">
              <span className="text-sm text-grey-500">
                (Will inherit if left Blank) {"  "}
              </span>
              {["A", "B", "C", "D"].map((stone) => (
                <div>
                  {/* <h3 className="font-semibold">
                    Stone {stone}{" "} */}
                  {/* <button
                  type="button"
                  onClick={() => toggleVisibility(stone)}
                  className="text-sm text-blue-500"
                >
                  [{stone.visible ? "Hide" : "Show"} Options]
                </button> */}
                  {/* </h3>{" "} */}
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
              {/* {["A", "B", "C", "D"].map((stone) => ( */}
              <div className="mb-4 bg-blue-50 p-4">
                {/* <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">
                      Stone {stone}{" "}
                      <button
                        type="button"
                        onClick={() => toggleVisibility(stone.id)}
                        className="text-sm text-blue-500"
                      >
                        [{stone.visible ? "Hide" : "Show"} Options]
                      </button>
                    </h3>
                    {/* <button
                      type="button"
                      onClick={() => handleAddOrStone(stone.id)}
                      className="text-sm text-green-500"
                    >
                      OR
                    </button> */}
                {/* </div> */}

                <div>
                  {optionArray.map((option, index) => (
                    <OptionOnAddCrystalForm
                      key={index}
                      option={option}
                      index={index}
                      options={options}
                      visibleStones={visibleStones}
                      unhideStone={unhideStone}
                      nextStonePart={nextStonePart}
                    />
                  ))}
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
            {/* <div className="flex justify-between">
              <button
                type="button"
                onClick={addStone}
                className="bg-purple-500 text-white px-4 py-2 rounded"
              >
                Add Stone Part
              </button>
              <button
                type="button"
                onClick={handleAddOrModel}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Another OR Model
              </button>
            </div> */}

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
  );
}

export default AddCrystalForm;
