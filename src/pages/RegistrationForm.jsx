import Inputs from "../sections/Inputs";
import Design from "../sections/Design";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RegistrationForm = () => {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/assets/images/bg1.jpg)" }}
    >
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-4 pt-20 pb-4">
        <div className="registration-container w-full max-w-7xl h-auto lg:h-[80vh] rounded-3xl backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl mx-4 flex flex-col lg:flex-row">
          {/* Image Section - Hidden on small screens */}
          <div className="registration-image-section hidden lg:flex lg:w-1/2 p-6 items-center justify-center">
            <div className="w-full h-full max-h-full rounded-2xl flex items-center justify-center overflow-hidden bg-white">
              <img
                src="/assets/images/RightLogo.png"
                alt="Registration"
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>
          </div>

          {/* Input Section */}
          <div className="registration-form-section w-full lg:w-1/2 flex flex-col">
            <div
              className="registration-form-scroll flex-1 px-4 py-6 md:p-6 lg:p-8 overflow-y-auto h-full max-h-[70vh] lg:max-h-[75vh] scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20 hover:scrollbar-thumb-white/40 scrollbar-track-rounded-full scrollbar-thumb-rounded-full"
              id="input-section"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor:
                  "rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)",
              }}
            >
              <Inputs />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RegistrationForm;
