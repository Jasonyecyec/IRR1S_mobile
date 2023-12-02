import React from "react";

const TextInput = ({
  label,
  placeholder,
  handleChange,
  value,
  name,
  disabled = false,
}) => {
  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={disabled ? "text" : "email"}
        id={name}
        name={name}
        value={value}
        placeholder={disabled ? "" : placeholder}
        onChange={handleChange}
        disabled={disabled}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
          disabled
            ? "cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            : "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        }`}
      />
    </div>
  );
};

export default TextInput;
