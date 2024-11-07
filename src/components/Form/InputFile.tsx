import React, { useState } from "react";

export default function InputFile({
  label,
  setFieldValue,
  name,
  error,
  touched,
}: {
  label: string;
  name: string;
  setFieldValue: (field: string, value: any) => void;
  error: string | undefined;
  touched: boolean | undefined;
}) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file =
      (event.currentTarget.files && event.currentTarget.files[0]) || null;
    setFieldValue(name, file);
  };
  return (
    <div className="mx-auto max-w-md font-[sans-serif]">
      <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">
        {label}
      </label>
      <input
        name={name}
        type="file"
        className="w-full cursor-pointer rounded border bg-white text-sm font-semibold text-gray-400 file:mr-4 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-4 file:py-3 file:text-gray-500 file:hover:bg-gray-200"
        accept="image/*"
        onChange={handleFileChange}
      />
      {touched && error ? (
        <p className="mt-2 text-xs text-red-600">{error}</p>
      ) : (
        <p className="mt-2 text-xs text-gray-400">PNG, JPG est autorisé.</p>
      )}
    </div>
  );
}
