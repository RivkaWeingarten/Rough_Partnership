"use client";
import React from "react";
import options from "@/roughOptionsPrograms.json";
import { toast } from "react-toastify";
import addCrystal from "@/app/actions/addCrystal";
import getRap from "@/app/actions/getRap"; // Make sure you import getRap correctly

function AddCrystalForm() {
  const addAction = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // Create an array to hold option data with promises to fetch price data
    const optionsDataPromises = options.map(async (option) => {
      const estShape = option.estShape;
      const estWeight = formData.get(`estWeight.${option.program}`);
      const notes = formData.get(`notes.${option.program}`);
      const estColor = formData.get("roughColor");
      const estClarity = formData.get("roughClarity");

      // Fetch price data if estWeight is present
      if (estWeight) {
        try {
          const list = await getRap(estShape, estWeight, estColor, estClarity);
          return { program: option.program, estShape, estWeight, notes, list };
        } catch (error) {
          console.error("Error fetching price data:", error);
          return null;
        }
      }
      return null;
    });

    // Wait for all promises to resolve
    const optionsData = (await Promise.all(optionsDataPromises)).filter(
      Boolean
    );

    console.log(`optionsData:`, optionsData);

    formData.append("optionsData", JSON.stringify(optionsData));

    const { data, error } = await addCrystal(formData);
    if (error) {
      toast.error(error);
    } else {
      toast.success(
        `Added crystal with resource number: ${data.resourceNumber}`
      );
    }
  };

  return (
    <>
      <section className="bg-blue-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={addAction}>
              <h2 className="text-3xl text-center font-semibold mb-6">
                Add Rough Diamond
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
                  placeholder="240-1"
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
                  placeholder="3.25"
                  required
                />
              </div>
              <div className="mb-4 flex flex-wrap items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <label className="block text-gray-700 font-bold mb-2 sm:mb-0 sm:w-auto w-full">
                  Rough Color {"  "}
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
                <label className="block text-gray-700 font-bold mb-2 sm:mb-0 sm:w-auto w-full">
                  Rough Clarity
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
              </div>
              <div className="mb-4 flex flex-wrap items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <label className="block text-gray-700 font-bold mb-2 sm:mb-0 sm:w-auto w-full">
                  Machine Color
                </label>
                <select
                  id="machineColor"
                  name="machineColor"
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
                <label className="block text-gray-700 font-bold mb-2 sm:mb-0 sm:w-auto w-full">
                  Machine Clarity
                </label>
                <select
                  id="machineClarity"
                  name="machineClarity"
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
              </div>
              <div className="mb-4 flex flex-wrap items-center space-y-4 sm:space-y-0 sm:space-x-4">
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
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border rounded w-full py-2 px-3"
                  rows="2"
                  placeholder="Add an optional description"
                ></textarea>
              </div>
              <div className="mb-4 bg-blue-50 p-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Options for 'A' stone
                </label>
                {options.map((option) => (
                  <div
                    key={option.program}
                    className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 items-center"
                  >
                    <div className="flex items-center w-full sm:w-auto sm:min-w-[150px]">
                      <label
                        htmlFor={`estWeight.${option.program}`}
                        className="mr-2 sm:w-[150px]"
                      >
                        {option.program}@
                      </label>
                      <input
                        type="number"
                        id={`estWeight.${option.program}`}
                        name={`estWeight.${option.program}`}
                        step={0.01}
                        className="border rounded w-full py-2 px-3 sm:w-[150px]"
                      />
                    </div>
                    <div className="flex-grow">
                      <textarea
                        id={`notes.${option.program}`}
                        name={`notes.${option.program}`}
                        className="block w-full p-2 border border-gray-300 rounded-md"
                        rows={1}
                        placeholder="Enter notes here"
                      ></textarea>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="images"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Images (Select up to 4 images)
                </label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  className="border rounded w-full py-2 px-3"
                  accept="image/*"
                  multiple
                />
              </div>
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Rough Diamond
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddCrystalForm;
