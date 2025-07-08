import React from 'react';

const PersonalInfoForm = ({ 
  firstName, setFirstName,
  middleName, setMiddleName,
  lastName, setLastName,
  suffix, setSuffix,
  phoneNumber,
  email,
  error,
  handleChange, handlePhoneNumberChange,
  inputClass
}) => {
  return (
    <>
      {/* Last Name */}
      <div className="col-span-12 md:col-span-6">
        <label htmlFor="l_name" className="block text-sm/6 font-bold text-white">
          Last Name:
        </label>
        <div className="mt-2">
          <div className="flex items-center rounded-md bg-white/20 backdrop-blur-sm border border-white/30 pl-3 focus-within:border-white/60">
            <input
              id="l_name"
              name="l_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              required
              autoComplete="off"
              className="block min-w-0 grow py-3 md:py-2 pr-3 pl-1 text-base text-white placeholder:text-gray-200 focus:outline-none sm:text-sm/6 bg-transparent"
              placeholder="Dela Cruz"
            />
          </div>
        </div>
      </div>

      {/* First Name */}
      <div className="col-span-12 md:col-span-6">
        <label htmlFor="f_name" className="block text-sm/6 font-bold text-white">
          First Name:
        </label>
        <div className="mt-2">
          <div className="flex items-center rounded-md bg-white/20 backdrop-blur-sm border border-white/30 pl-3 focus-within:border-white/60">
            <input
              id="f_name"
              name="f_name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              autoComplete="off"
              className="block min-w-0 grow py-3 md:py-2 pr-3 pl-1 text-base text-white placeholder:text-gray-200 focus:outline-none sm:text-sm/6 bg-transparent"
              placeholder="Juan"
            />
          </div>
        </div>
      </div>

      {/* Middle Name */}
      <div className="col-span-12 md:col-span-6">
        <label htmlFor="m_name" className="block text-sm/6 font-bold text-white">
          Middle Name:
        </label>
        <div className="mt-2">
          <div className="flex items-center rounded-md bg-white/20 backdrop-blur-sm border border-white/30 pl-3 focus-within:border-white/60">
            <input
              id="m_name"
              name="m_name"
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              autoComplete="off"
              className="block min-w-0 grow py-3 md:py-2 pr-3 pl-1 text-base text-white placeholder:text-gray-200 focus:outline-none sm:text-sm/6 bg-transparent"
              placeholder="Antonio (Optional)"
            />
          </div>
        </div>
      </div>

      {/* Suffix */}
      <div className="col-span-12 md:col-span-6">
        <label htmlFor="suffix" className="block text-sm/6 font-bold text-white">
          Suffix:
        </label>
        <div className="mt-2">
          <div className="flex items-center rounded-md bg-white/20 backdrop-blur-sm border border-white/30 pl-3 focus-within:border-white/60">
            <input
              type="text"
              name="suffix"
              id="suffix"
              className="block min-w-0 grow py-3 md:py-2 pr-3 pl-1 text-base text-white placeholder:text-gray-200 focus:outline-none sm:text-sm/6 bg-transparent"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              maxLength={5}
              placeholder="Jr. (Optional)"
              autoComplete='off'
            />
          </div>
        </div>
      </div>

      {/* Phone Number */}
      <div className="col-span-12">
        <label htmlFor="phone_number" className="block text-sm/6 font-bold text-white">
          Phone No.:
        </label>
        <div className="mt-2">
          <div className="flex items-center rounded-md bg-white/20 backdrop-blur-sm border border-white/30 pl-3 focus-within:border-white/60">
            <input
              id="phone_number"
              name="phone_number"
              inputMode="numeric"
              pattern="^\+?[0-9]{0,12}$"
              autoComplete="off"
              type="tel"
              required
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="+6399665757631"
              className="block min-w-0 grow py-3 md:py-2 pr-3 pl-1 text-base text-white placeholder:text-gray-200 focus:outline-none sm:text-sm/6 bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Email Address */}
      <div className="col-span-12">
        <label htmlFor="email_address" className="block text-sm/6 font-bold text-white">
          Email address:
        </label>
        <div className="mt-2">
          <input
            id="email_address"
            name="email_address"
            type="email"
            value={email}
            onChange={handleChange}
            required
            autoComplete="off"
            placeholder="juan.delacruz@deped.gov.ph"
            className={inputClass}
          />
          {error && (
            <p className="mt-1 text-xs text-red-400">{error}</p>
          )}
          <small className="text-xs italic text-gray-200">
            <strong className="text-white me-0.5">Note:</strong>
            Please use your deped email account.
          </small>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoForm;
