import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

const SuccesfulRegistration = () => {
  const MySwal = withReactContent(Swal);

  const { userId } = useParams();
  const location = useLocation();
  // const [usersId, setUsersId] = useState(location.state?.event || null);
  const [where] = useState(location.state?.where || null);
  const [when] = useState(() => {
    const rawDate = location.state?.when;
    if (!rawDate) return null;

    // Manually parse MM/DD/YYYY to avoid Invalid Date
    const [month, day, year] = rawDate.split("/").map(Number);
    const parsed = new Date(year, month - 1, day); // JS months are 0-based

    return parsed.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });
  const [isValid, setIsValid] = useState(false);

  const sweetAlert = () => {
    MySwal.fire({
      title: "Loading...",
      text: "Please wait while fetching your Digital ID.",
      didOpen: () => {
        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
        MySwal.showLoading();
        // MySwal.showValidationMessage();
      },
    });
  };

  // useEffect(() => {
  //   const validateUserId = async () => {
  //     try {
  //       const res = await fetch(
  //         `https://192.168.2.50:3000/api/registration/get`
  //         // `https://deped-backend-2.onrender.com/api/registration/get`
  //       );
  //       const data = await res.json();

  //       const userExists = data.some((item) => item.id === userId);
  //       setIsValid(userExists);
  //     } catch (err) {
  //       console.error("Validation error:", err);
  //       setIsValid(false);
  //     }
  //   };

  //   if (userId) {
  //     validateUserId();
  //   } else {
  //     setIsValid(false);
  //   }
  // }, [userId]);

  const fetchDigitalId = async () => {
    sweetAlert();
    MySwal.close();
  };

  // if (!isValid) {
  //   return (
  //     <div className="text-center p-8 text-red-600">
  //       <h1 className="text-2xl font-bold">404 - Not Found</h1>
  //     </div>
  //   );
  // }
  return (
    <>
      <div className="flex items-center justify-center mx-10 md:mx-0">
        <div className="max-w-xl mx-auto mt-10 text-center p-6 px-4 sm:px-6 bg-white rounded-xl shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-4">
            <CheckCircleIcon className="h-20 w-20 sm:h-8 sm:w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-600">
              Registration Successful!
            </h1>
          </div>
          <p className="text-gray-700 text-base mb-2">
            Thank you for registering for this event. We've received your
            information successfully.
          </p>
          <p className="text-gray-600 text-sm">
            <span className="font-bold text-gray-900">WHERE:</span> {where}
            <br />
            <span className="font-bold text-gray-900">WHEN:</span> {when}
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => (window.location.href = "")}
              className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition text-sm md:text-md"
            >
              <span>
                <ArrowDownTrayIcon className="size-6 me-2" />
              </span>
              You can download your Digital ID here.
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccesfulRegistration;
