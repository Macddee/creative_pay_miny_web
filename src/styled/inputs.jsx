import React from "react";

export default function Input({
  title,
  value,
  type,
  inputId,
  name,
  placeholder,
  onChange,
}) {
  return (
    <div className="mb-5 w-full">
      <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">
        {title}
      </label>
      <input
        type={type}
        id={inputId}
        value={value}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
}