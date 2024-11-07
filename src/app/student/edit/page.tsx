import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormStudent from "@/features/student/FormStudent";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Add-students",
};
export default function page() {
  return (
    <div>
      <Breadcrumb pageName={"Edit student"} />
      <div className="rounded-sm border border-stroke bg-white px-5 py-5  shadow-default dark:border-strokedark dark:bg-boxdark">
        <FormStudent />
      </div>
    </div>
  );
}
