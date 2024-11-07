"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormStudent from "@/features/student/FormStudent";
import { useGetStudentByIdQuery } from "@/lib/api/studentApi";
import React from "react";
export default function Page({ params }: { params: { studentId: string } }) {
  const { data, isLoading, error } = useGetStudentByIdQuery(params.studentId);
  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement des données.</p>;
  return (
    <div>
      <Breadcrumb pageName={"Edit student"} />
      <div className="rounded-sm border border-stroke bg-white px-5 py-5  shadow-default dark:border-strokedark dark:bg-boxdark">
        {data.student && <FormStudent studentEdit={data.student} />}
      </div>
    </div>
  );
}
