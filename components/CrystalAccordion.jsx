"use client";
// import { FaDiamond } from "react-icons/fa";
import { useState } from "react";

const CrystalAccordion = ({ crystal }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // <div className="border border-gray-200 rounded mb-2">
    <div className="rounded-xl shadow-md relative">
      <button
        className="w-full flex justify-between items-center p-4 text-left font-medium bg-gray-100 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* <span>
          {`${crystal.resourceNumber} Rough Weight: ${crystal.originalWeight}
       Machine: ${crystal.machineColor} ${crystal.machineClarity} Grade: ${crystal.roughColor} ${crystal.roughClarity}`}
        </span> */}
        <div className="p-4">
          <div className="text-left md:text-center lg:text-left mb-6">
            <h3 className="text-xl font-bold">{crystal.resourceNumber}</h3>
          </div>
          <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
            {crystal.originalWeight} Rough Cts
          </h3>

          <div className="flex justify-center gap-4 text-gray-500 mb-4">
            <p>
              <span className="md:hidden lg:inline">Grade</span>
              {crystal.roughColor} {crystal.roughClarity}
            </p>
            <p>
              <span className="md:hidden lg:inline">Machine</span>
             {crystal.machineColor}{" "}
              {crystal.machineClarity}
              <span className="md:hidden lg:inline">Grade </span>
              {/* <FaDiamond className="inline mr-2" />  */}
              💎 {crystal.roughColor} {crystal.roughClarity}
            </p>
            <p>
              <span className="md:hidden lg:inline">Machine </span>
              {/* <FaDiamond className="inline mr-2" /> */}
              {crystal.machineColor} {crystal.machineClarity}
            </p>
          </div>
        </div>
        <span className="text-xl">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <div className="p-4 bg-white">{crystal.description}</div>}
    </div>
  );
};

export default CrystalAccordion;
