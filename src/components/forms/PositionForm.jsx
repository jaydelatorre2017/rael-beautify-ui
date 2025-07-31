import React from 'react';
import Select from 'react-select/creatable';

const PositionForm = ({ 
  selectedPosition, setSelectedPosition,
  selectedParticipantType, setSelectedParticipantType,
  customStyles
}) => {
  const position = [
    { value: "Teacher-in-charge (TIC)", label: "Teacher-in-charge (TIC)" },
    { value: "Officer-in-charge (OIC)", label: "Officer-in-charge (OIC)" },
    { value: "Head Teacher I", label: "Head Teacher I" },
    { value: "Head Teacher II", label: "Head Teacher II" },
    { value: "Head Teacher III", label: "Head Teacher III" },
    { value: "Head Teacher IV", label: "Head Teacher IV" },
    { value: "Assistant Principal", label: "Assistant Principal" },
    { value: "School Principal I", label: "School Principal I" },
    { value: "School Principal II", label: "School Principal II" },
    { value: "School Principal III", label: "School Principal III" },
    { value: "School Principal IV", label: "School Principal IV" },
    { value: "EPS", label: "EPS" },
    { value: "PSDS", label: "PSDS" },
     { value: "Chief", label: "Chief" },
    { value: "ASDS", label: "ASDS" },
    { value: "SDS", label: "SDS" },
    { value: "ARD", label: "ARD" },
    { value: "RD", label: "RD" },
  ];

  const participant_type = [
    { value: "Participant", label: "Participant" },
    { value: "Training Technical Team", label: "Training Technical Team" },
    { value: "Facilitator/Coordinator", label: "Facilitator/Coordinator" },
  ];

  return (
    <>
      {/* Positions */}
      <div className="col-span-12">
        <label htmlFor="position" className="block text-sm/6 font-bold text-white">
          Position:
        </label>
        <div className="mt-2 grid grid-cols-1">
          <Select
            id="position"
            name="position"
            placeholder="Select or type your position..."
            className="select-option"
            classNamePrefix="rs"
            value={selectedPosition}
            onChange={setSelectedPosition}
            styles={customStyles}
            options={position}
            openMenuOnFocus={true}
            isCreatable={true}
            formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
          />
        </div>
      </div>

      {/* Participant Type */}
      <div className="col-span-12">
        <label htmlFor="participant_type" className="block text-sm/6 font-bold text-white">
          Participant Type:
        </label>
        <div className="mt-2 grid grid-cols-1">
          <Select
            id="participant_type"
            placeholder="Select user type..."
            className="select-option"
            classNamePrefix="rs"
            value={selectedParticipantType}
            onChange={setSelectedParticipantType}
            styles={customStyles}
            options={participant_type}
            openMenuOnFocus={true}
          />
        </div>
      </div>
    </>
  );
};

export default PositionForm;
