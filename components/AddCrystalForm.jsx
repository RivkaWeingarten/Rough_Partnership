"use client";
import React, { useState } from "react";
import options from "@/roughOptionsPrograms.json";
import { toast } from "react-toastify";
import addCrystal from "@/app/actions/addCrystal";
import getRap from "@/app/actions/getRap"; // Ensure this is correctly imported

function AddCrystalForm() {
  const [stones, setStones] = useState([{ id: "A", visible: true }]);

  const addStone = () => {
    const newId = String.fromCharCode(
      stones[stones.length - 1].id.charCodeAt(0) + 1
    );
    setStones([...stones, { id: newId, visible: true }]);
  };

  const toggleVisibility = (id) => {
    setStones(
      stones.map((stone) =>
        stone.id === id ? { ...stone, visible: !stone.visible } : stone
      )
    );
  };

  const addAction = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const optionsDataPromises = stones
      .map((stone) => {
        return options.map(async (option) => {
          const estWeight = formData.get(
            `estWeight.${stone.id}.${option.program}`
          );
          const notes = formData.get(`notes.${stone.id}.${option.program}`);
          const estColor = formData.get("roughColor");
          const estClarity = formData.get("roughClarity");

          if (estWeight) {
            try {
              const list = await getRap(
                option.estShape,
                estWeight,
                estColor,
                estClarity
              );
              return {
                stoneId: stone.id,
                program: option.program,
                estShape: option.estShape,
                estWeight,
                notes,
                list,
              };
            } catch (error) {
              console.error("Error fetching price data:", error);
              return null;
            }
          }
          return null;
        });
      })
      .flat();

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

            {stones.map((stone, index) => (
              <div key={stone.id} className="mb-4 bg-blue-50 p-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Options for '{stone.id}' stone
                </label>
                <button
                  type="button"
                  onClick={() => toggleVisibility(stone.id)}
                >
                  {stone.visible ? "-" : "+"}
                </button>
                {stone.visible && (
                  <>
                    {options.map((option) => (
                      <div
                        key={option.program}
                        className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 items-center"
                      >
                        <div className="flex items-center w-full sm:w-auto sm:min-w-[150px]">
                          <label
                            htmlFor={`estWeight.${stone.id}.${option.program}`}
                            className="mr-2 sm:w-[150px]"
                          >
                            {option.program}@
                          </label>
                          <input
                            type="number"
                            id={`estWeight.${stone.id}.${option.program}`}
                            name={`estWeight.${stone.id}.${option.program}`}
                            step={0.01}
                            className="border rounded w-full py-2 px-3 sm:w-[150px]"
                          />
                        </div>
                        <div className="flex-grow">
                          <textarea
                            id={`notes.${stone.id}.${option.program}`}
                            name={`notes.${stone.id}.${option.program}`}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                            rows={1}
                            placeholder="Enter notes here"
                          ></textarea>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {index === stones.length - 1 && (
                  <button
                    type="button"
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={addStone}
                  >
                    Add B Stone
                  </button>
                )}
              </div>
            ))}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Add Rough Diamond
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddCrystalForm;
