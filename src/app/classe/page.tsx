import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormClasse from "@/features/classe/form";
import { Metadata } from "next";
import React from "react";
import ListClasse from "@/features/classe/list";
export const metadata: Metadata = {
  title: "Classe",
};

export default function page() {
  return (
    <div>
      <Breadcrumb pageName={"Classe"} />
      <div className="rounded-sm border border-stroke bg-white px-5 py-5  shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* form add classe */}
        <FormClasse />
        {/* Liste classe */}
        <ListClasse />
      </div>
    </div>
  );
}
