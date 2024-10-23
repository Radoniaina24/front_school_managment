"use client";
import React, { useState } from "react";

const SelectGender = ({
  label,
  onChange,
  value,
  id,
}: {
  label: string;

  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  id: string;
}) => {
  return (
    <div className="mb-1">
      <label className="mb-2.5 block text-black dark:text-white">{label}</label>

      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary `}
        >
          <option
            key={"garçon"}
            value={"Garçon"}
            className="text-body dark:text-bodydark"
          >
            Garçon
          </option>
          <option
            key={"fille"}
            value={"Fille"}
            className="text-body dark:text-bodydark"
          >
            Fille
          </option>
        </select>
        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2"></span>
      </div>
    </div>
  );
};

export default SelectGender;
