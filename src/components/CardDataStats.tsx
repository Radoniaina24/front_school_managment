import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children,
}) => {
  return (
    <div className="flex  items-center  justify-between rounded-sm  border border-stroke bg-white px-10 py-6 shadow-default dark:border-strokedark dark:bg-boxdark lg:justify-between lg:space-x-0">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>
      <div className="  h-10 border-s-2 border-blue-600"></div>
      <div className="flex items-end justify-between ">
        <div>
          <p className=" text-sm dark:text-white">{title}</p>
          <span className=" text-sm font-bold  text-black dark:text-white">
            {total}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
