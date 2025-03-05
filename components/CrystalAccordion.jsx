"use client";
import { useState } from "react";
import OptionsSelector from "./OptionsSelector";
import RoughStatus from "./RoughStatus";

const CrystalAccordion = ({ resourceNumber,lot }) => {
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
            <span className="text-black-500  md:inline">
            {resourceNumber.roughWeight} Rough Cts
              </span>
              <span className="text-black-500  md:inline">
                Grade {resourceNumber.roughColor}{" "}
                {resourceNumber.plusMinusRColor} {resourceNumber.roughClarity}
                {resourceNumber.plusMinusRClarity}{" "}
              </span>
              <span className="text-gray-500  md:inline">
                {resourceNumber.machineColor==='' ? '' : `Machine ${resourceNumber.machineColor}`}
              </span>
              <span className="inline md:hidden text-black-500"> 💎</span>
             
              <span className="text-gray-500  md:inline">
             {resourceNumber.roughDescription}
              </span>
              <span className="inline md:hidden text-black-500"> 💎</span>
          
            <RoughStatus options={resourceNumber.sortedOptions} diamonds={resourceNumber.diamonds} />
            <span className="text-xl md:self-center">{isOpen ? "−" : "+"}</span>

            <a href={`/lots/${lot}/edit-crystal/${resourceNumber.resourceNumber}`}>
                    ✏️    
                   
            </a>
          </div>

 
                    
    
        </button>
        {isOpen && (
          <div className="p-4 bg-blue-100 w-full">
            {resourceNumber.options.length === 0 ? (
              <h3 className="text-lg font-bold mb-2 ">
                No options for {resourceNumber.resourceNumber}
              </h3>
            ) : (

            //   <pre className="text-sm font-mono text-gray-800">
            //   {JSON.stringify(resourceNumber.sortedOptions, null, 2)}
            // </pre>
              <OptionsSelector options={resourceNumber.sortedOptions} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CrystalAccordion;
