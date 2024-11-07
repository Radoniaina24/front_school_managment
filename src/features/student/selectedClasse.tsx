"use client";
import Student from "@/interface/Student";
import { useGetAllClasseQuery, useGetClasseQuery } from "@/lib/api/classeApi";
import React, { useEffect, useState } from "react";

const SelectClasse = ({
  label,
  onChange,
  value,
  id,
  error,
  touched,
}: {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: any;
  id: string;
  error: any;
  touched: any;
}) => {
  const { data, isLoading } = useGetAllClasseQuery("");
  const optionClasse = data?.classes?.map((item: any) => (
    <option
      key={item?._id}
      value={item?.level}
      className="text-body dark:text-bodydark"
    >
      {item.level}
    </option>
  ));
  return (
    <div className="mb-1">
      <label className="mb-2.5 block text-black dark:text-white">{label}</label>

      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          id={id}
          value={value?.level}
          onChange={onChange}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary `}
        >
          <option value={""} className="text-body dark:text-bodydark">
            Veillez entrez la classe
          </option>
          {optionClasse}
        </select>
        {error && touched ? (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium"></span> {error}
          </p>
        ) : (
          ""
        )}
        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2"></span>
      </div>
    </div>
  );
};

export default SelectClasse;
