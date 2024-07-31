"use client";
import React, { useState, useRef } from "react";

import options from "@/roughOptionsPrograms.json";
import { toast } from "react-toastify";
import addCrystal from "@/app/actions/addCrystal";
import getRap from "@/app/actions/getRap";

function AddCrystalForm({lotName}) {
  const formRef = useRef(null);
  const [stones, setStones] = useState([{ id: "A", visible: true }]);
  const [currentModel, setCurrentModel] = useState(1);

  const [visibleStones, setVisibleStones] = useState({});

  const unhideStone = (letter, index) => {
    setVisibleStones((prev) => ({
      ...prev,
      [`${letter}-${index}`]: true,
    }));
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

  const addOrStone = (currentStonePart) => {
    let orStoneNumber = parseFloat(currentStonePart.slice(1));
    let currentStonePartLetter = currentStonePart[0];
    if (currentStonePart.length === 1) orStoneNumber = 1;
    else orStoneNumber += 1;
    return currentStonePartLetter + orStoneNumber;
  };

  const addStone = () => {
    const lastStoneId = stones[stones.length - 1].id;
    const newId = nextStonePart(lastStoneId);
    if (newId <= "D") {
      setStones([...stones, { id: newId, visible: true }]);
    } else {
      toast.error("Only A, B, C and D stones are allowed.");
    }
  };

  // const addStoneProgram = () => {
  //   const lastStoneId = stones[stones.length - 1].id;
  //   const newId = nextStonePart(lastStoneId);
  //   if (newId <= "D") {
  //     setStones([...stones, { id: newId, visible: true }]);
  //   } else {
  //     toast.error("Only A, B, C, and D stones are allowed.");
  //   }
  // };

  // const handleAddOrStone = (id) => {
  //   const newId = addOrStone(id);
  //   setStones([...stones, { id: newId, visible: true }]);
  // };

  const handleAddOrModel = () => {
    nextModel();
    const newStones = stones.map((stone) => ({
      ...stone,
      id: `${stone.id}_${currentModel}`,
    }));
    setStones([...stones, ...newStones]);
  };

  const toggleVisibility = (id) => {
    setStones(
      stones.map((stone) =>
        letter === id ? { ...stone, visible: !stone.visible } : stone
      )
    );
  };

  const addAction = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const letters = ["A", "B", "C", "D"];

    const optionsDataPromises = stones.flatMap((stone) => {
      return options.flatMap((option, index) => {
        return letters.map(async (letter) => {
          const estWeight = formData.get(`estWeight.${letter}.${index}`);
          const notes = formData.get(`notes.${letter}.${index}`);

          const estPlusMinusRColor =
            formData.get(`estPlusMinusRColor.${letter}`) === "" &&
            !formData.has(`estPlusMinusRColor.${letter}`) &&
            (formData.get(`estColor.${letter}`) === "" ||
              !formData.has(`estColor.${letter}`))
              ? formData.get("plusMinusRColor")
              : formData.get(`estPlusMinusRColor.${letter}`);

          const estPlusMinusRClarity =
            (formData.get(`estPlusMinusRClarity.${letter}`) === "" ||
              !formData.has(`estPlusMinusRClarity.${letter}`)) &&
            (formData.get(`estClarity.${letter}`) === "" ||
              !formData.has(`estClarity.${letter}`))
              ? formData.get("plusMinusRClarity")
              : formData.get(`estPlusMinusRClarity.${letter}`);

          const estColor =
            formData.get(`estColor.${letter}`) === ""
              ? formData.get("roughColor")
              : formData.get(`estColor.${letter}`);
          const estClarity =
            formData.get(`estClarity.${letter}`) === ""
              ? //  ||   !formData.has(!`estClarity.${letter}`)
                formData.get("roughClarity")
              : formData.get(`estClarity.${letter}`);

          if (estWeight) {
            try {
              const program = options.find(
                (opt) =>
                  opt.program === formData.get(`estProgram.${letter}.${index}`)
              );
              const estShape = program ? program.estShape : null;
              const estProgram = program ? program.program : null;
              console.log(
                `shape is ${estShape} program is ${estProgram} est weight is ${estWeight}
                  est color is ${estColor} est clarity is ${estClarity} `
              );
              const listPrice = await getRap(
                estShape,
                estWeight,
                estColor,
                estClarity
              );
              console.log(listPrice);
              return {
                ABC: letter,
                optionNumber: index + 1,
                program: estProgram,
                estShape,
                estWeight,
                estColor,
                estClarity,
                notes,
                listPrice,
                estPlusMinusRColor,
                estPlusMinusRClarity,
              };
            } catch (error) {
              console.error("Error fetching price data:", error);
              return null;
            }
          }
          return null;
        });
      });
    });

    const optionsData = (await Promise.all(optionsDataPromises)).filter(
      Boolean
    );

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
                <option value="Very Strong Yellow">Very Strong Yellow</option>
              </select>
              <label className="block text-gray-700 font-bold mb-2 sm:mb-0 sm:w-auto w-full">
                Graining
              </label>
              <input
                type="text"
                id="graining"
                name="graining"
                className="border rounded w-full sm:w-24 py-2 px-3"
              />
            </div>

            <div className="mb-4">
              <span className="text-sm text-grey-500">
                (Can Leave Grades Blank) {"  "}
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

                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div key={index}>
                      <div className="border-b-2 border-black text-0xl text-center">
                        <span className="bg-transparent px-5">
                          {/* # {index + 1} */}
                        </span>
                      </div>
                      {["A", "B", "C", "D"].map((letter) => (
                        <div
                          key={`${option.program}-${letter}-${index}`}
                          className={`flex flex-wrap items-center space-x-2 sm:space-x-4 ${
                            letter !== "A" &&
                            !visibleStones[`${letter}-${index}`]
                              ? "hidden"
                              : ""
                          }`}
                        >
                          <label className="">{letter}</label>

                          <select
                            name={`estProgram.${letter}.${index}`}
                            className="border rounded py-1 px-2 w-full sm:w-auto sm:min-w-[100px]"
                            defaultValue={option.program}
                          >
                            {options.map((opt) => (
                              <option key={opt.program} value={opt.program}>
                                {opt.program}
                              </option>
                            ))}
                          </select>

                          <input
                            type="number"
                            step="0.01"
                            id={`estWeight.${letter}.${index}`}
                            name={`estWeight.${letter}.${index}`}
                            className="border rounded py-1 px-2 w-full sm:w-[100px]"
                            placeholder="Carats"
                            maxLength={10} // To ensure that it only allows up to 10 characters
                          />

                          <textarea
                            id={`notes.${letter}.${option.program}`}
                            name={`notes.${letter}.${option.program}`}
                            className="block w-full p-1 border border-gray-300 rounded-md sm:w-auto sm:min-w-[200px]"
                            rows={1}
                            placeholder="Notes"
                          />

                          {letter !== "D" && (
                            <button
                              type="button"
                              onClick={() =>
                                unhideStone(nextStonePart(letter), index)
                              }
                              className="bg-transparent text-red-500 px-3 py-2 rounded"
                            >
                              +{nextStonePart(letter)}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between">
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
            </div>

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
