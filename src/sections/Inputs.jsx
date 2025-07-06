import React from "react";
const Inputs = () => {
  return (
    <div className="px-8">
      <form>
        <div className="grid grid-cols-1 gap-6 mb-10">
          <div className="col-span-12 md:col-span-4" >
            <label
              htmlFor="l_name"
              className="block text-sm/6 font-bold text-gray-900"
            >
              Last Name:
            </label>
            <div className="mt-2">
              <div className="flex items-center rounded-md bg-gray-100 pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                <input
                  id="l_name"
                  name="l_name"
                  // value={lastName}
                  // onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  required
                  autoComplete="off"
                  className="block min-w-0 grow py-3 md:py-2 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  placeholder="Dela Cruz"
                />
              </div>
            </div>
          </div>
          
        </div>
      </form>
    </div>
  );
};

export default Inputs;
