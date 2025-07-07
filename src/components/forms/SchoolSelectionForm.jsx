import React from 'react';
import Select from 'react-select';

const SchoolSelectionForm = ({
  selectedDivision,
  selectedDistrict,
  selectedSchool, setSelectedSchool,
  divisionOptions, districtOptions, schoolOptions,
  handleDivisionChange, handleDistrictChange,
  customStyles
}) => {
  return (
    <>
      {/* Division */}
      <div className="col-span-12">
        <label htmlFor="division" className="block text-sm/6 font-bold text-white">
          Division:
        </label>
        <div className="mt-2">
          <Select
            id="division"
            placeholder="Select division..."
            className="select-option"
            classNamePrefix="rs"
            value={selectedDivision}
            onChange={handleDivisionChange}
            options={divisionOptions}
            styles={customStyles}
            openMenuOnFocus={true}
          />
        </div>
      </div>

      {/* District */}
      <div className="col-span-12">
        <label htmlFor="district" className="block text-sm/6 font-bold text-white">
          District:
        </label>
        <div className="mt-2">
          <Select
            id="district"
            placeholder="Select district..."
            className="select-option"
            classNamePrefix="rs"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            styles={customStyles}
            options={districtOptions}
            openMenuOnFocus={true}
          />
        </div>
      </div>

      {/* School */}
      <div className="col-span-12">
        <label htmlFor="school" className="block text-sm/6 font-bold text-white">
          School:
        </label>
        <div className="mt-2">
          <Select
            id="school"
            placeholder="Select school..."
            className="select-option"
            classNamePrefix="rs"
            value={selectedSchool}
            onChange={setSelectedSchool}
            options={schoolOptions}
            styles={customStyles}
            openMenuOnFocus={true}
          />
        </div>
      </div>
    </>
  );
};

export default SchoolSelectionForm;
