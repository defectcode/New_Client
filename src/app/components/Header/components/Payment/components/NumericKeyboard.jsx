import React from 'react';

const NumericKeyboard = ({ onKeyPress }) => {
  const keys = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '.', '0', '⌫'
  ];

  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      {keys.map(key => (
        <button
          key={key}
          onClick={() => onKeyPress(key)}
          className="bg-gray-800 text-white rounded-md p-4 text-xl font-semibold focus:outline-none active:bg-gray-700"
        >
          {key}
        </button>
      ))}
    </div>
  );
};

export default NumericKeyboard;
