import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FormSubject from "@/features/subject/form";
import ListSubject from "@/features/subject/list";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Subject",
};
export default function page() {
  return (
    <DefaultLayout>
      <div>
        <Breadcrumb pageName={"Subject liste"} />
        <div className="rounded-sm border border-stroke bg-white px-5 py-5  shadow-default dark:border-strokedark dark:bg-boxdark">
          {/* form add subject */}
          <FormSubject />
          {/* Liste subject */}
          <ListSubject />
        </div>
      </div>
    </DefaultLayout>
  );
}
