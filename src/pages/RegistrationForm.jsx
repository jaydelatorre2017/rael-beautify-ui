import Inputs from "../sections/Inputs";
import Design from "../sections/Design";

const RegistrationForm = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat lg:block lg:relative" style={{ backgroundImage: "url(/assets/images/bg1.jpg)" }}>
      <main
        className="flex-1 flex items-center justify-center py-4 lg:h-screen lg:py-0"
      >
        <div className="w-4/5 h-auto lg:h-4/5 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl mx-2 md:mx-20 flex">
          {/* Input Section */}
          <div className="w-full lg:w-1/2 flex flex-col h-full relative">
            <div
              className="flex-1 px-2 py-4 md:p-8 lg:px-8 overflow-y-auto scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20 hover:scrollbar-thumb-white/40 scrollbar-track-rounded-full scrollbar-thumb-rounded-full"
              id="input-section"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor:
                  "rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)",
                margin: "8px 4px 8px 0",
              }}
            >
              <Inputs />
            </div>
          </div>

          {/* Image Section - Hidden on small screens */}
          <div className="hidden lg:flex w-1/2 h-full p-8 items-center justify-center">
            <div className="w-full h-full rounded-2xl flex items-center justify-center overflow-hidden">
              <img
                src="/assets/images/reg-bg.png"
                alt="Registration"
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="lg:absolute lg:bottom-2 lg:left-0 lg:right-0 flex justify-center pb-4 lg:pb-0">
        <div className="w-4/5 mx-2 md:mx-20">
          <div className="backdrop-blur-md bg-white/15 border border-white/20 rounded-2xl py-3 px-6 shadow-lg text-center">
            <p className="font-serif font-semibold text-sm text-white flex md:block flex-col items-center">
              <span className="text-sm">
                &#169;Copyright SDO Camarines Norte
              </span>
              <span className="text-sm">
                @ICT Unit with Year 2025 Mabini CS OJT
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegistrationForm;
