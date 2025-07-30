import { useState, useEffect } from 'react';
import { createWorker } from "tesseract.js";
import axios from "axios";
import imageCompression from "browser-image-compression";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

export const useRegistrationForm = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const HEADER_KEY = import.meta.env.VITE_CUSTOM_HEADER_KEY;

  // Personal Info State
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isDirty, setIsDirty] = useState(false);


  // Position and Type State
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedParticipantType, setSelectedParticipantType] = useState(null);
  const [typeSelected, setTypeSelected] = useState(null);

  // Office Data State
  const [officeData, setOfficeData] = useState([]);
  const [selectedFunctionalDivision, setSelectedFunctionalDivision] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [functionalDivisionOptions, setFunctionalDivisionOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);

  // School Data State
  const [schoolData, setSchoolData] = useState([]);
  const [divisionOptions, setDivisionOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [schoolOptions, setSchoolOptions] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);

  // Payment and Images State
  const [orNumber, setOrNumber] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [foodRestriction, setFoodRestriction] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [receiptImg, setReceiptImg] = useState(null);
  const [userImg, setUserImg] = useState(null);

  // Event State
  const [activeEvent, setActiveEvents] = useState({});

  // Utility Functions
  const sweetAlert = (title, text, icon) => {
    MySwal.fire({
      title: title,
      text: `${text}`,
      icon: `${icon}`,
    });
  };

  const handlePhoneNumberChange = (e) => {
    let value = e.target.value.replace(/[^\d+]/g, "");
    if (value.startsWith("+") && !value.startsWith("+63")) {
      value = "+" + value.replace(/^\+\d*/, "63");
    }

    if (value.startsWith("0") && value.length > 11) {
      value = value.slice(0, 11);
    } else if (
      (value.startsWith("63") || value.startsWith("+63")) &&
      value.length > 12
    ) {
      value = value.slice(0, 12);
    } else {
      value = value.slice(0, 11);
    }

    setPhoneNumber(value);
  };

  const validateEmail = (value) => {
    const domain = /^[^\s@]+@deped\.gov\.ph$/;
    if (!domain.test(value)) {
      setError(`Email must be a valid DepEd email (e.g. juan.delacruz@deped.gov.ph)`);
    } else {
      setError("");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!isDirty) setIsDirty(true);
    validateEmail(value);
  };

  const handleDivisionChange = (selected) => {
    setSelectedDivision(selected);
    setSelectedDistrict(null);
    setSelectedSchool(null);

    const filteredDistricts = schoolData
      .filter((item) => item.division_name === selected.value)
      .map((item) => item.district_name);

    const uniqueDistricts = [...new Set(filteredDistricts)].map((name) => ({
      value: name,
      label: name,
    }));

    setDistrictOptions(uniqueDistricts);
  };

  const handleDistrictChange = (selected) => {
    setSelectedDistrict(selected);
    setSelectedSchool(null);

    const filteredSchools = schoolData
      .filter(
        (item) =>
          item.division_name === selectedDivision.value &&
          item.district_name === selected.value
      )
      .map((item) => ({
        value: item.school_id,
        label: item.school_name,
      }));

    setSchoolOptions(filteredSchools);
  };

  const handleOfficeDivisionChange = (selected) => {
    setSelectedDivision(selected);
    setSelectedFunctionalDivision(null);
    setSelectedSection(null);

    const filtered = officeData.filter(
      (item) => item.division_name === selected.value
    );
    const uniqueFunctionalDivisions = [
      ...new Set(filtered.map((item) => item.functional_division_name)),
    ].map((name) => ({
      value: name,
      label: name,
    }));

    setFunctionalDivisionOptions(uniqueFunctionalDivisions);
  };

  const handleFunctionalDivisionChange = (selected) => {
    setSelectedFunctionalDivision(selected);
    setSelectedSection(null);

    const filtered = officeData.filter(
      (item) =>
        item.division_name === selectedDivision.value &&
        item.functional_division_name === selected.value
    );

    const sections = filtered.map((item) => ({
      value: item.id,
      label: item.section_name,
    }));

    setSectionOptions(sections);
  };

  const compressImage = async (imageFile) => {
    const options = {
      maxSizeMB: 3,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      return compressedFile;
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = async (e) => {
    const file_uploaded = e.target.files[0];
    if (file_uploaded) {
      const compressedImage = await compressImage(file_uploaded);
      setPreview(URL.createObjectURL(compressedImage));
      setReceiptImg(compressedImage);
      setFile(file_uploaded);
    }
  };

  const handleUserImageChange = async (e) => {
    const file_uploaded = e.target.files[0];
    if (file_uploaded) {
      if (file_uploaded.size > 5 * 1024 * 1024) {
        sweetAlert("Error uploading image", "Image must be less than 5MB.", "error");
        e.target.value = "";
        return;
      }
    }

    const compressedImage = await compressImage(file_uploaded);
    setUserImg(compressedImage);
    setImgPreview(URL.createObjectURL(compressedImage));
  };

  const submitLoading = () => {
    MySwal.fire({
      title: "Loading...",
      text: "Submitting your registration.",
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });
  };

  const resetForm = () => {
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setSuffix("");
    setPhoneNumber("");
    setEmail("");
    setOrNumber("");
    setPaymentDate("");
    setUserImg(null);
    setReceiptImg(null);
    setFoodRestriction("");
    setSelectedDivision(null);
    setSelectedDistrict(null);
    setSelectedSchool(null);
    setSelectedSection(null);
    setSelectedPosition(null);
    setSelectedParticipantType(null);
    setTypeSelected("");
    setDistrictOptions([]);
    setSchoolOptions([]);
    setFunctionalDivisionOptions([]);
    setSectionOptions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !selectedPosition ||
      !selectedParticipantType ||
      !file ||
      !imgPreview ||
      !phoneNumber
    ) {
      sweetAlert("Incomplete Form", "Please complete all required fields.", "warning");
      return;
    }

    submitLoading();
    const formDataToSend = new FormData();

    formDataToSend.append("event_id", activeEvent.id);
    formDataToSend.append("office_id", selectedSection?.value || "");
    formDataToSend.append("f_name", firstName);
    formDataToSend.append("m_name", middleName);
    formDataToSend.append("l_name", lastName);
    formDataToSend.append("suffix", suffix);
    formDataToSend.append("position", selectedPosition?.value);
    formDataToSend.append("phone_number", phoneNumber);
    formDataToSend.append("email_address", email);
    formDataToSend.append("participant_type", selectedParticipantType?.value);
    formDataToSend.append("school", selectedSchool?.value || "");
    formDataToSend.append("or_number", orNumber);
    formDataToSend.append("payment_date", paymentDate);
    formDataToSend.append("or_receipt", receiptImg);
    formDataToSend.append("participant_image", userImg);
    formDataToSend.append("food_restriction", foodRestriction);

    try {
      const res = await axios.post(`${baseURL}/api/registration/creates`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          [HEADER_KEY]: API_KEY,
        },
      });

      if (res.status === 200) {
        const userId = res.data.id_info;
        const count = res.data.count;
        MySwal.close();
        resetForm();
        Swal.fire("Success", `Registered submitted successfully! <br/> <strong>Registered Count<strong/>: ${count}`, "success").then(() => {
          navigate(`/id/${userId}`, {
            state: {
              event: userId,
              when: activeEvent.start_date,
              where: activeEvent.venue,
              count:count
            },
          });
        });
      }
    } catch (err) {
      MySwal.close();
      const status = err.response?.status;
      const message = err.response?.data?.error;
      if (status === 409) {
        sweetAlert("Conflict", message, "error");
      }
      console.error(err);
    }
  };

  // Effects
  useEffect(() => {
    const fetchActiveEvent = async () => {
      try {
        const response = await fetch(`${baseURL}/api/events/get_active_events`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            [HEADER_KEY]: API_KEY
          }
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setActiveEvents(data[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchActiveEvent();
  }, [baseURL, API_KEY, HEADER_KEY]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch(`${baseURL}/api/schools/get`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            [HEADER_KEY]: API_KEY
          }
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setSchoolData(data);

        const divisions = [...new Set(data.map((item) => item.division_name))].map((name) => ({
          value: name,
          label: name,
        }));

        setDivisionOptions(divisions);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchOffice = async () => {
      try {
        const response = await fetch(`${baseURL}/api/schools/get_office`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            [HEADER_KEY]: API_KEY
          }
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setOfficeData(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (typeSelected === "Office") {
      fetchOffice();
    } else {
      fetchSchools();
    }
  }, [typeSelected, baseURL, API_KEY, HEADER_KEY]);

  useEffect(() => {
    const convertImageToText = async () => {
      if (!file) return;

      const worker = await createWorker("eng");
      try {
        // OCR logic can be implemented here if needed
      } catch (error) {
        console.error("OCR Error:", error);
      } finally {
        await worker.terminate();
      }
    };
    convertImageToText();
  }, [file]);

  return {
    // State
    firstName, setFirstName,
    middleName, setMiddleName,
    lastName, setLastName,
    suffix, setSuffix,
    phoneNumber, setPhoneNumber,
    email, setEmail,
    error, isDirty,
  
    selectedPosition, setSelectedPosition,
    selectedParticipantType, setSelectedParticipantType,
    typeSelected, setTypeSelected,
    officeData,
    selectedFunctionalDivision, setSelectedFunctionalDivision,
    selectedSection, setSelectedSection,
    functionalDivisionOptions, sectionOptions,
    schoolData, divisionOptions, districtOptions, schoolOptions,
    selectedDivision, setSelectedDivision,
    selectedDistrict, setSelectedDistrict,
    selectedSchool, setSelectedSchool,
    orNumber, setOrNumber,
    paymentDate, setPaymentDate,
    foodRestriction, setFoodRestriction,
    file, preview, imgPreview,
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
  };
};
