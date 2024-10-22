import React from "react";

export default function Input({
  label,
  type,
  id,
  value,
  onChange,
  error,
  touched,
  placeholder,
}: {
  type: string;
  id: string;
  placeholder?: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: any;
  touched: any;
}) {
  const classNameInput =
    error && touched
      ? "bg-red-50 border outline-none border-red-500 text-red-900 placeholder-red-700 text-sm rounded focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full px-5 py-2 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
      : "w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary";
  const classNameLabel =
    error && touched
      ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
      : "mb-2.5 block text-sm font-medium text-black dark:text-white";
  return (
    <div className="mb-1">
      <label htmlFor={id} className={classNameLabel}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={classNameInput}
        placeholder={placeholder}
      />
      {error && touched ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium"></span> {error}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
