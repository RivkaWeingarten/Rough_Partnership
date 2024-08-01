
import classNames from "classnames";
export default function RoughStatus({ options, diamonds }) {
    const { background, statusText } = statusColor(options, diamonds);
  
    return (
        <h3
        className={classNames(
          'px-4 py-2 rounded-lg text-blue-500 font-bold text-right',
          {
            'bg-white': background === 'white',
            'bg-green-100': background === 'green-100',
            'bg-yellow-200': background === 'yellow-200',
          }
        )}
      >
        {statusText}
      </h3>
    );
  }
  
  function statusColor(options, diamonds) {
    let background = '';
    let statusText = '';
  
    if (options.length === 0) {
      // Case: No options available
      background = 'white';
      statusText = 'No options yet';
    } else if (options.some(option => option.selected)) {
      // Case: At least one option is selected
      
      background = 'green-100';
      statusText = Array.isArray(diamonds) && diamonds.length > 0
        ? diamonds.map(diamond => `${diamond.estimatedProgram} @ ${diamond.estimatedWeight}`).join(', ')
        : 'No diamonds available';
    } else {
      // Case: No options are selected
      background = 'yellow-200';
      statusText = 'Please select';
    }
  
    return { background, statusText };
  }