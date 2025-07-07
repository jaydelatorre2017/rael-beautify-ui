import React from 'react';
import Select from 'react-select';

const TypeSelectionForm = ({ 
  typeSelected, setTypeSelected, 
  customStyles 
}) => {
  const types = [
    { value: "Office", label: "Office" },
    { value: "School", label: "School" },
  ];

  return (
    <div className="col-span-12">
      <label htmlFor="type" className="block text-sm/6 font-bold text-white">
        Type:
      </label>
      <div className="mt-2 grid grid-cols-1">
        <Select
          id="type"
          placeholder="Select type..."
          className="select-option"
          classNamePrefix="rs"
          value={types.find((t) => t.value === typeSelected)}
          onChange={(option) => setTypeSelected(option.value)}
          styles={customStyles}
          options={types}
          openMenuOnFocus={true}
        />
      </div>
    </div>
  );
};

export default TypeSelectionForm;
