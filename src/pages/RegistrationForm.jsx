import Inputs from "../sections/Inputs";
import Design from "../sections/Design";

const RegistrationForm = () => {
  return (
    <main className="flex flex-col md:flex-row w-screen h-screen scroll-smooth overflow-auto md:overflow-hidden">
      <div
        className="w-full order-2 md:order-1 md:w-1/2 min-h-screen md:h-full bg-white overflow-y-auto pt-10"
        id="input-section"
      >
        <Inputs />
      </div>
      <div 
				className="w-full order-1 md:order-2 md:w-1/2 min-h-screen md:h-full bg-blue-600"
			>
        <Design />
      </div>
    </main>
  );
};

export default RegistrationForm;
