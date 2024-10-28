import React from "react";

export default function Limit({
  limit,
  setLimit,
}: {
  setLimit: any;
  limit: number;
}) {
  function handleChangeLimit(event: React.ChangeEvent<HTMLSelectElement>) {
    setLimit(parseInt(event.target.value));
  }
  return (
    <div className="mb-1">
      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <span className="mx-2">Ligne par page</span>
        <select
          value={limit}
          onChange={handleChangeLimit}
          className={`relative z-20  appearance-none rounded border border-stroke bg-transparent px-2 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary `}
        >
          <option value={"10"} className="text-body dark:text-bodydark">
            10
          </option>

          <option value={"25"} className="text-body dark:text-bodydark">
            25
          </option>
          <option value={"50"} className="text-body dark:text-bodydark">
            50
          </option>
          <option value={"100"} className="text-body dark:text-bodydark">
            100
          </option>
        </select>
        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2"></span>
      </div>
    </div>
  );
}
