"use client";
import { useState } from "react";
import OptionsSelector from "./OptionsSelector";

const CrystalAccordion = ({ resourceNumber }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border-b border-gray-200 mb-1">
      <div className="w-full bg-gray-100 rounded-xl shadow-md">
        <button
          className="w-full flex flex-col justify-between p-2 text-left font-medium focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-wrap justify-between items-center w-full mb-4">
            <h3 className="text-xl font-bold">
              {resourceNumber.resourceNumber}
            </h3>
            <h3 className="bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right">
              {resourceNumber.roughWeight} Rough Cts
            </h3>
          </div>
          <div className="flex flex-wrap justify-between items-center w-full">
            <p className="">
              <span className="text-black-500  md:inline">
                Grade {resourceNumber.roughColor}{" "}
                {resourceNumber.plusMinusRColor} {resourceNumber.roughClarity}
                {resourceNumber.plusMinusRClarity}{" "}
              </span>
              <span className="text-gray-500  md:inline">
                Machine {resourceNumber.machineColor}{" "}
              </span>
              <span className="inline md:hidden text-black-500"> 💎</span>
            </p>
            <span className="text-xl md:self-center">{isOpen ? "−" : "+"}</span>
          </div>
        </button>
        {isOpen && (
          <div className="p-4 bg-white w-full">
            {resourceNumber.options.length === 0 ? (
              <h3 className="text-lg font-bold mb-2">
                No options for {resourceNumber.resourceNumber}
              </h3>
            ) : (
              <OptionsSelector options={resourceNumber.options} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CrystalAccordion;
