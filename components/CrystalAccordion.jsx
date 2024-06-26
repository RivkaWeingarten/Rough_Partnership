// "use client";
// // import { FaDiamond } from "react-icons/fa";
// import { useState } from "react";

// const CrystalAccordion = ({ crystal }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     // <div className="border border-gray-200 rounded mb-2">
//     <div className="w-full rounded-xl shadow-md relative">
//       <button
//         className="w-full flex justify-between items-center p-4 text-left font-medium bg-gray-100 focus:outline-none"
//         onClick={() => setIsOpen(!isOpen)}
//       >

//         <div className="p-4">
//           <div className="text-left md:text-center lg:text-left mb-6">
//             <h3 className="text-xl font-bold">{crystal.resourceNumber}</h3>
//           </div>
//           <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
//             {crystal.originalWeight} Rough Cts
//           </h3>

//           <div className="flex justify-center gap-4  mb-4">

//             <p>
//               <span className="md:hidden lg:inline text-gray-500">Machine </span>
//              <span className='text-gray-500'>{crystal.machineColor}{" "}
//               {crystal.machineClarity}</span>
//               <span className="md:hidden lg:inline text-black-500"> Grade </span>
//               {/* <FaDiamond className="inline mr-2" />  */}
//               💎 {crystal.roughColor}{" "} {crystal.roughClarity}
//             </p>

//           </div>
//         </div>
//         <span className="text-xl">{isOpen ? "−" : "+"}</span>
//       </button>
//       {isOpen && <div className="p-4 bg-white">{crystal.description}</div>}
//     </div>
//   );
// };

// export default CrystalAccordion;

"use client";
import { useState } from "react";

const CrystalAccordion = ({ crystal }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border-b border-gray-200 mb-1">
      <div className="w-full bg-gray-100 rounded-xl shadow-md">
        <button
          className="w-full flex flex-col justify-between p-2 text-left font-medium focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-wrap justify-between items-center w-full mb-4">
            <h3 className="text-xl font-bold">{crystal.resourceNumber}</h3>
            <h3 className="bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right">
              {crystal.originalWeight} Rough Cts
            </h3>
          </div>
          <div className="flex flex-wrap justify-between items-center w-full">
            <p className="">
              <span className="text-gray-500 hidden md:inline">Machine  {crystal.machineColor} {crystal.machineClarity}{" "}</span>
             
              <span className="text-black-500  md:inline">
                Grade {crystal.roughColor} {crystal.roughClarity}
              </span>
              <span className="inline md:hidden text-black-500"> 💎</span>
            </p>
            <span className="text-xl md:self-center">{isOpen ? "−" : "+"}</span>
          </div>
        </button>
        {isOpen && (
          <div className="p-4 bg-white w-full">{crystal.description}</div>
        )}
      </div>
    </div>
  );
};

export default CrystalAccordion;
