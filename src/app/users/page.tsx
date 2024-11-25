import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";

export default function page() {
  return (
    <DefaultLayout>
      <div>
        <Breadcrumb pageName={"Users"} />
        <div className="rounded-sm border border-stroke bg-white px-5 py-5  shadow-default dark:border-strokedark dark:bg-boxdark">
          {/* form add classe */}
          Utilisateur
          {/* Liste classe */}
        </div>
      </div>
    </DefaultLayout>
  );
}
