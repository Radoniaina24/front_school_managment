import React from "react";
import CardDataStats from "../CardDataStats";
import Students_Svg from "./Svg/students";
import Teachers_Svg from "./Svg/Teachers";
import Parents_Svg from "./Svg/Parents";
import Earnings_Svg from "./Svg/Earnings";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <Link href={"/student"}>
        <CardDataStats title="Students" total="5000">
          <Students_Svg />
        </CardDataStats>
      </Link>
      <Link href={"/teacher"}>
        <CardDataStats title="Teachers" total="1500">
          <Teachers_Svg />
        </CardDataStats>
      </Link>

      <CardDataStats title="Parents" total="6000">
        <Parents_Svg />
      </CardDataStats>
      <CardDataStats title="Earnings" total="30000">
        <Earnings_Svg />
      </CardDataStats>
    </div>
  );
}
