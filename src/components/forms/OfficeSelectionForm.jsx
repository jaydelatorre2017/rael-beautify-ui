import React from 'react';
import Select from 'react-select';

const OfficeSelectionForm = ({
  selectedDivision, selectedFunctionalDivision, selectedSection,
  functionalDivisionOptions, sectionOptions,
  officeData, handleOfficeDivisionChange, handleFunctionalDivisionChange, setSelectedSection,
  customStyles
}) => {
  return (
    <>
      {/* Division Office */}
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
            onChange={handleOfficeDivisionChange}
            options={[
              ...new Set(officeData.map((item) => item.division_name))
            ].map((name) => ({ value: name, label: name }))}
            styles={customStyles}
            openMenuOnFocus={true}
          />
        </div>
      </div>

      {/* Functional Division */}
      <div className="col-span-12">
        <label htmlFor="functionalDivision" className="block text-sm/6 font-bold text-white">
          Functional Division:
        </label>
        <div className="mt-2">
          <Select
            id="functionalDivision"
            placeholder="Select division..."
            className="select-option"
            classNamePrefix="rs"
            value={selectedFunctionalDivision}
            onChange={handleFunctionalDivisionChange}
            options={functionalDivisionOptions}
            styles={customStyles}
          />
        </div>
      </div>

      {/* Section */}
      <div className="col-span-12">
        <label htmlFor="section" className="block text-sm/6 font-bold text-white">
          Section:
        </label>
        <div className="mt-2">
          <Select
            id="section"
            placeholder="Select section..."
            className="select-option"
            classNamePrefix="rs"
            value={selectedSection}
            onChange={setSelectedSection}
            options={sectionOptions}
            styles={customStyles}
          />
        </div>
      </div>
    </>
  );
};

export default OfficeSelectionForm;
