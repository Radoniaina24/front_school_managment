import { on } from "events";
import React, { useState } from "react";

export default function SearchBar({
  query,
  onQuery,
}: {
  query: string;
  onQuery: any;
}) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onQuery(e.target.value);
  }

  return (
    <div className="relative">
      <button className="absolute left-2 top-1/2 -translate-y-1/2">
        <svg
          className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
            fill=""
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
            fill=""
          />
        </svg>
      </button>

      <input
        type="text"
        placeholder="Recherche..."
        className="appearance-none rounded border border-stroke bg-transparent px-10 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary  "
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}
