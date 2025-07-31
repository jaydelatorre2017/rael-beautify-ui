import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const Design = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex-center relative">
      <div className="flex flex-col gap-y-4">
        <img
          src="assets/images/deped_regional_logo.png"
          alt="sdo_deped_logo"
          width={180}
          className="block mx-auto"
        />
        <h2 className="font-black text-white text-5xl">
          Reigonal Assembly of Educational Leaders{" "}
          <span className="text-blue-950">Online Registration</span>
        </h2>
        <p className="text-white font-light text-md/6">
          Welcome to the official RAEL 2025 Online Registration Form. This form
          is intended for participants registering for the Regional Assembly of
          Education Leaders (RAEL). Kindly ensure that all information
          provided is accurate and complete, as it will be used solely for event
          coordination and official updates. We are excited to have you join
          this inspiring and empowering event. 
        </p>
        <p className="text-white font-light text-md/6">
          <span className="font-black text-blue-950">Nota bene:{" "}</span> 
          All collected information shall be treated in accordance with the Data Privacy Law.
        </p>
        {/* Chevron above paragraph when not scrolled */}
        {!isScrolled && (
          <a
            href="#input-section"
            className="block md:hidden mx-auto w-fit animate-bounce mt-4"
          >
            <ChevronDownIcon className="h-12 w-12 text-white" />
          </a>
        )}
      </div>
      {/* Chevron at bottom when scrolled */}
      {isScrolled && (
        <a
          href="#input-section"
          className="block md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ChevronDownIcon className="h-12 w-12 text-white" />
        </a>
      )}
    </div>
  );
};

export default Design;
