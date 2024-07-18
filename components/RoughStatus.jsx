
import classNames from "classnames";
export default function RoughStatus({ options }) {
    const { background, statusText } = statusColor(options);
  
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
  
  function statusColor(options) {
    let background = '';
    let statusText = '';
  
    if (options.length === 0) {
      background = 'white';
      statusText = 'No options yet';
    } else if (options.some(option => option.selected)) {
      const selectedOption = options.find(option => option.selected);
      background = 'green-100';
      statusText = `${selectedOption.estProgram} @ ${selectedOption.estWeight}`
    } else {
      background = 'yellow-200';
      statusText = 'Please select';
    }
  
    return { background, statusText };
  }
  