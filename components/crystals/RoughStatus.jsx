
// import classNames from "classnames";
// // export default function RoughStatus({ options, diamonds }) {
// //     const { background, statusText } = statusColor(options, diamonds);
  
// //     return (
// //         <h3
// //         className={classNames(
// //           'px-4 py-2 rounded-lg text-blue-500 font-bold text-right',
// //           {
// //             'bg-white': background === 'white',
// //             'bg-green-100': background === 'green-100',
// //             'bg-yellow-200': background === 'yellow-200',
// //           }
// //         )}
// //       >
// //         {statusText}
// //       </h3>
// //     );
// //   }

//   export default function RoughStatus({background, statusText}) {
//     const { background, statusText } = statusColor(options, diamonds);
  
//     return (
//         <h3
//         className={classNames(
//           'px-4 py-2 rounded-lg text-blue-500 font-bold text-right',
//           {
//             'bg-white': background === 'white',
//             'bg-green-100': background === 'green-100',
//             'bg-yellow-200': background === 'yellow-200',
//           }
//         )}
//       >
//         {statusText}
//       </h3>
//     );
//   }
  
//   function statusColor(options, diamonds) {
//     let background = '';
//     let statusText = '';
  
//     if (options.length === 0) {
//       // Case: No options available
//       <RoughStatus background="white" statusText="No options yet" />
     
//     } else if (options.some(option => option.selected)) {
//       // Case: At least one option is selected
      
//        <RoughStatus background="green-100" statusText="Selected" />      
//         // diamonds.map(diamond => (<RoughStatus background='green-100' statusText={diamond.resourceNumber.slice(-1)} />)) 
          
       
//     } else {
//       // Case: No options are selected
//       <statusText background="yellow-200" statusText="Please select" />
     
//     }
  
//     return { background, statusText };
//   }

import React from 'react';
import classNames from 'classnames';

export default function RoughStatus({ options, diamonds }) {
  return (
    <div>
      {statusColor(options, diamonds).map((status, index) => (
        <h3
          key={index}
          className={classNames(
            'px-4 py-2 rounded-lg text-blue-500 font-bold text-right',
            {
              'bg-white': status.background === 'white',
              'bg-green-100': status.background === 'green-100',
              'bg-yellow-200': status.background === 'yellow-200',
            }
          )}
        >
          {status.statusText}
        </h3>
      ))}
    </div>
  );
}

function statusColor(options, diamonds) {
  let backgroundsAndStatuses = [];

  if (options.length === 0) {
    // Case: No options available
    backgroundsAndStatuses.push({ background: 'white', statusText: 'No options yet' });
  } else if (options.some(option => option.selected)) {
    // Case: At least one option is selected
    diamonds.forEach(diamond => {
      backgroundsAndStatuses.push({
        background: 'green-100',
        statusText: `${diamond.estimatedProgram} @ ${diamond.estimatedWeight}`
      });
    });
  } else {
    // Case: No options are selected
    backgroundsAndStatuses.push({ background: 'yellow-200', statusText: 'Please select' });
  }

  return backgroundsAndStatuses;
}