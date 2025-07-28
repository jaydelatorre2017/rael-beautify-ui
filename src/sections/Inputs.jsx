import { useRegistrationForm } from "../hooks/useRegistrationForm";
import {
  PersonalInfoForm,
  PositionForm,
  TypeSelectionForm,
  SchoolSelectionForm,
  OfficeSelectionForm,
  ImageUploadForm,
} from "../components/forms";

const Inputs = () => {
  const {
    // Personal Info
    firstName,
    setFirstName,
    middleName,
    setMiddleName,
    lastName,
    setLastName,
    suffix,
    setSuffix,
    phoneNumber,
    email,
    error,
    isDirty,

    // Position and Type
    selectedPosition,
    setSelectedPosition,
    selectedParticipantType,
    setSelectedParticipantType,
    typeSelected,
    setTypeSelected,

    // Office Data
    officeData,
    selectedFunctionalDivision,
    selectedSection,
    setSelectedSection,
    functionalDivisionOptions,
    sectionOptions,

    // School Data
    divisionOptions,
    districtOptions,
    schoolOptions,
    selectedDivision,
    selectedDistrict,
    selectedSchool,
    setSelectedSchool,

    // Payment and Images
    orNumber,
    setOrNumber,
    paymentDate,
    setPaymentDate,
    foodRestriction,
    setFoodRestriction,
    preview,
    imgPreview,

    // Event
    activeEvent,

    // Handlers
    handlePhoneNumberChange,
    handleEmailChange,
    handleDivisionChange,
    handleDistrictChange,
    handleOfficeDivisionChange,
    handleFunctionalDivisionChange,
    handleFileChange,
    handleUserImageChange,
    handleSubmit,
  } = useRegistrationForm();

  const inputClass = `block w-full rounded-md bg-white/20 backdrop-blur-sm border px-3 py-3 md:py-2 text-base text-white placeholder:text-gray-200 sm:text-sm/6 outline-none ${
    isDirty && error
      ? "border-red-400 focus:border-red-400"
      : isDirty && !error
      ? "border-green-400 focus:border-green-400"
      : "border-white/30 focus:border-white/60"
  }`;

  const customStyles = {
    control: (base, state) => ({
      ...base,
      paddingTop: "0.375rem",
      paddingBottom: "0.375rem",
      borderRadius: "0.375rem",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(4px)",
      borderColor: state.isFocused
        ? "rgba(255, 255, 255, 0.6)"
        : "rgba(255, 255, 255, 0.3)",
      color: "white",
      "&:hover": {
        borderColor: "rgba(255, 255, 255, 0.5)",
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
    placeholder: (base) => ({
      ...base,
      color: "rgba(255, 255, 255, 0.7)",
    }),
    input: (base) => ({
      ...base,
      color: "white",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "rgba(255, 255, 255, 0.95)"
        : state.isFocused
        ? "rgba(255, 255, 255, 0.85)"
        : "rgba(255, 255, 255, 0.75)",
      color:
        state.isSelected || state.isFocused
          ? "rgba(0, 0, 0, 0.95)"
          : "rgba(0, 0, 0, 0.9)",
      backdropFilter: "blur(20px)",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        color: "rgba(0, 0, 0, 0.95)",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      backdropFilter: "blur(24px)",
      border: "1px solid rgba(255, 255, 255, 0.6)",
      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
    }),
    noOptionsMessage: (base) => ({
      ...base,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      color: "rgba(0, 0, 0, 0.8)",
      padding: "8px 16px",
      fontSize: "14px",
      borderTop: "1px solid rgba(255, 255, 255, 0.8)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.8)",
    }),
  };

  const event_name = activeEvent?.description || "";
  const event_date = activeEvent?.start_date
    ? new Date(activeEvent.start_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const end_date = activeEvent?.end_date
    ? new Date(activeEvent.end_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="px-6">
      <h1 className="text-xl md:text-2xl font-black text-white">
        {event_name}
      </h1>
      <h2 className="text-xl font-bold text-white">
        <span className="font-black">Event Date: </span>
        {event_date}
      </h2>
      <h2 className="text-xl font-bold text-white">
        <span className="font-black">End Date: </span>
        {end_date}
      </h2>
      <h3 className="text-xl font-black text-white mb-2">
        Fill out form below!
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="pb-6 max-w-full">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-12">
            <PersonalInfoForm
              firstName={firstName}
              setFirstName={setFirstName}
              middleName={middleName}
              setMiddleName={setMiddleName}
              lastName={lastName}
              setLastName={setLastName}
              suffix={suffix}
              setSuffix={setSuffix}
              phoneNumber={phoneNumber}
              email={email}
              error={error}
              handleChange={handleEmailChange}
              handlePhoneNumberChange={handlePhoneNumberChange}
              inputClass={inputClass}
            />

            <PositionForm
              selectedPosition={selectedPosition}
              setSelectedPosition={setSelectedPosition}
              selectedParticipantType={selectedParticipantType}
              setSelectedParticipantType={setSelectedParticipantType}
              customStyles={customStyles}
            />

            <TypeSelectionForm
              typeSelected={typeSelected}
              setTypeSelected={setTypeSelected}
              customStyles={customStyles}
            />

            {typeSelected === "School" && (
              <SchoolSelectionForm
                selectedDivision={selectedDivision}
                selectedDistrict={selectedDistrict}
                selectedSchool={selectedSchool}
                setSelectedSchool={setSelectedSchool}
                divisionOptions={divisionOptions}
                districtOptions={districtOptions}
                schoolOptions={schoolOptions}
                handleDivisionChange={handleDivisionChange}
                handleDistrictChange={handleDistrictChange}
                customStyles={customStyles}
              />
            )}

            {typeSelected === "Office" && (
              <OfficeSelectionForm
                selectedDivision={selectedDivision}
                selectedFunctionalDivision={selectedFunctionalDivision}
                selectedSection={selectedSection}
                functionalDivisionOptions={functionalDivisionOptions}
                sectionOptions={sectionOptions}
                officeData={officeData}
                handleOfficeDivisionChange={handleOfficeDivisionChange}
                handleFunctionalDivisionChange={handleFunctionalDivisionChange}
                setSelectedSection={setSelectedSection}
                customStyles={customStyles}
              />
            )}

            <ImageUploadForm
              orNumber={orNumber}
              setOrNumber={setOrNumber}
              paymentDate={paymentDate}
              setPaymentDate={setPaymentDate}
              foodRestriction={foodRestriction}
              setFoodRestriction={setFoodRestriction}
              preview={preview}
              imgPreview={imgPreview}
              handleFileChange={handleFileChange}
              handleUserImageChange={handleUserImageChange}
            />

            {/* Nota Bene */}
            <div className="col-span-12">
              <p className="inline text-md/6 font-bold text-white">
                Nota bene:{" "}
              </p>
              <p className="inline text-sm italic text-gray-300">
                All collected information shall be treated in accordance with
                the Data Privacy Law
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full">
          <button
            type="submit"
            className="rounded-md w-full py-3.5  text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-blue-600 hover:bg-blue-500 cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Inputs;
