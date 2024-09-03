import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const Chip = ({ label, onRemove }) => {
  return (
    <div
    className="inline-flex items-center bg-blue-200 text-blue-800 px-3 py-1 rounded-full cursor-pointer m-2"
    >
      <span className="mr-2">{label}</span>
      <AiOutlineClose
        className="text-blue-800 hover:text-blue-600"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(label);
        }}
      />
    </div>
  );
};

export default Chip;