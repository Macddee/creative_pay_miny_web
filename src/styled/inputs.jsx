import React from "react";

export default function Input({
  title,
  value,
  type,
  inputId,
  name,
  placeholder,
  onChange,
  Icon = null,
  onIconClick = null,
  step = null,
  required = null,
  onKeyDown = null,
  ref = null
}) {
  return (
    <div className="mb-4 w-full">
      <label htmlFor="title" className="block mb-1 text-base font-medium text-gray-900 ">
        {title}
      </label>
      <div className="relative">
        <input
          type={type}
          id={inputId}
          value={value}
          name={name}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          required={required}
          ref={ref}
          {...(step && { step: "0.01", min: "0" })}
        />
        {Icon && (
          <button type='button' onClick={onIconClick} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <Icon />
          </button>
        )}
      </div>
    </div>
  );
}