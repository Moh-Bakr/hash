import React from "react";

const InputField = ({ label, labelError, handleFieldChange, errors }) => {
  return (
    <div className="mb-4">
      <label className="mb-2 block font-bold" htmlFor="name">
        {label}
      </label>
      <input
        id={labelError}
        className={`focus:shadow-outline block rounded border border-gray-400 py-2 px-3 leading-tight focus:outline-none ${
          errors[labelError] ? "border-red-500" : ""
        }`}
        type="text"
        name={labelError}
        onChange={handleFieldChange}
      />
      {errors[labelError] && (
        <p className="text-red-500">{errors[labelError]}</p>
      )}
    </div>
  );
};

export default InputField;
