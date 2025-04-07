// StoneOptions.js
import React from "react";

const OptionOnAddCrystalForm = ({
  option,
  index,
  options,
  visibleStones,
  unhideStone,
  nextStonePart,
}) => {
  return (
    <>
     <div className="border-b-2 border-black text-0xl text-center">
                        <span className="bg-transparent px-5">
                          {/* # {index + 1} */}
                        </span>
                      </div>
    <div>
      {["A", "B", "C", "D"].map((letter) => (
        <div
          key={`${option.program}-${letter}-${index}`}
          className={`flex flex-wrap items-center space-x-2 sm:space-x-4 ${
            letter !== "A" && !visibleStones[`${letter}-${index}`] ? "hidden" : ""
          }`}
        >
          <label>{letter}</label>

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
            maxLength={10}
          />

          <textarea
            id={`notes.${letter}.${index}`}
            name={`notes.${letter}.${index}`}
            className="block w-full p-1 border border-gray-300 rounded-md sm:w-auto sm:min-w-[200px]"
            rows={1}
            placeholder="Notes"
          />

          {letter !== "D" && (
            <button
              type="button"
              onClick={() => unhideStone(nextStonePart(letter), index)}
              className="bg-transparent text-red-500 px-3 py-2 rounded"
            >
              +{nextStonePart(letter)}
            </button>
          )}
        </div>
      ))}
    </div>
    </>
  );
};

export default OptionOnAddCrystalForm
