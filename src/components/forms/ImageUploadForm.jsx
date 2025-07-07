import React from 'react';
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const ImageUploadForm = ({
  orNumber, setOrNumber,
  paymentDate, setPaymentDate,
  foodRestriction, setFoodRestriction,
  preview, imgPreview,
  handleFileChange, handleUserImageChange
}) => {
  return (
    <>
      {/* OR Receipt */}
      <div className="col-span-12">
        <label htmlFor="or_number" className="block text-sm/6 font-bold text-white">
          OR No.:
        </label>
        <div className="mt-2">
          <input
            id="or_number"
            name="or_number"
            type="text"
            maxLength={7}
            value={orNumber}
            onChange={(e) => setOrNumber(e.target.value)}
            inputMode="numeric"
            required
            autoComplete="off"
            placeholder="Enter OR No."
            className="block w-full rounded-md bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-3 md:py-2 text-base text-white placeholder:text-gray-200 sm:text-sm/6 outline-none focus:border-white/60"
          />
        </div>
      </div>

      {/* Payment Date */}
      <div className="col-span-12">
        <label htmlFor="payment_date" className="block text-sm/6 font-bold text-white">
          Payment Date:
        </label>
        <div className="mt-2">
          <input
            id="payment_date"
            name="payment_date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            type="date"
            required
            className="block w-full rounded-md bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-3 md:py-2 text-base text-white placeholder:text-gray-200 sm:text-sm/6 outline-none focus:border-white/60"
          />
        </div>
      </div>

      {/* User Receipt */}
      <div className="col-span-12">
        <label htmlFor="or_receipt" className="block text-sm/6 font-bold text-white">
          Receipt:
        </label>
        <label htmlFor="or_receipt" className="block border-2 border-gray-300 rounded-md cursor-pointer hover:border-indigo-400">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-48 w-full rounded object-contain my-5"
            />
          ) : (
            <div className="flex flex-col h-48 items-center justify-center my-5">
              <PhotoIcon aria-hidden="true" className="size-24 text-gray-300" />
              <p className="text-gray-400 text-sm/6 font-bold">
                <span className="text-indigo-400">Click</span> here to upload receipt.
              </p>
            </div>
          )}
        </label>
        <div>
          <input
            id="or_receipt"
            name="or_receipt"
            type="file"
            accept="image/*"
            required
            onChange={handleFileChange}
            className="hidden"
          />
          <small className="text-xs italic text-gray-200">
            Click the icon or image to upload your receipt (OR No. must be visible)
          </small>
        </div>
      </div>

      {/* User Image */}
      <div className="col-span-12">
        <label htmlFor="participant_image" className="block text-sm/6 font-bold text-white">
          User Image:
        </label>
        <label htmlFor="participant_image" className="block border-2 border-gray-300 rounded-md cursor-pointer hover:border-indigo-400">
          {imgPreview ? (
            <img
              src={imgPreview}
              alt="Preview"
              className="h-48 w-full rounded object-contain my-5"
            />
          ) : (
            <div className="flex flex-col h-48 items-center justify-center my-5">
              <UserCircleIcon aria-hidden="true" className="size-24 text-gray-300" />
              <p className="text-gray-400 text-sm/6 font-bold">
                <span className="text-indigo-400">Click</span> here to upload your image.
              </p>
            </div>
          )}
        </label>
        <div>
          <input
            id="participant_image"
            name="participant_image"
            type="file"
            accept="image/*"
            onChange={handleUserImageChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Food Restriction */}
      <div className="col-span-12">
        <label htmlFor="food_restriction" className="block text-sm/6 font-bold text-white">
          Food Restriction(If Any):
        </label>
        <div className="mt-2">
          <input
            id="food_restriction"
            name="food_restriction"
            type="text"
            value={foodRestriction}
            onChange={(e) => setFoodRestriction(e.target.value)}
            autoComplete="off"
            required
            placeholder="e.g., No peanuts, Vegetarian, etc."
            className="block w-full rounded-md bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-3 md:py-2 text-base text-white placeholder:text-gray-200 sm:text-sm/6 outline-none focus:border-white/60"
          />
        </div>
      </div>
    </>
  );
};

export default ImageUploadForm;
