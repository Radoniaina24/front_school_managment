"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Student from "@/interface/Student";
import { useGetStudentQuery } from "@/lib/api/studentApi";
import React from "react";
import ViewStudent from "./svg/view";
import Delete from "./svg/delete";
import Edit from "./svg/edit";
import SearchBar from "./search";

export default function ListStudent() {
  const { data, isLoading, error } = useGetStudentQuery("");
  const students = data?.students;
  return (
    <div>
      <Breadcrumb pageName={"List students"} />

      <div className="rounded-sm border border-stroke bg-white px-5 py-5  shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="grid justify-end">
          <SearchBar />
        </div>

        <div
          className="relative  overflow-x-auto overflow-y-auto"
          style={{ height: "350px" }}
        >
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
            <thead className="sticky top-0">
              <tr className=" bg-gray-2 text-left dark:bg-meta-4 dark:text-white">
                <th scope="col" className="px-6 py-3">
                  Nom complet
                </th>
                <th scope="col" className="px-6 py-4">
                  Date de naissance
                </th>
                <th scope="col" className="px-6 py-4">
                  Sexe
                </th>
                <th scope="col" className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {students?.map((student: Student) => (
                <tr
                  key={student._id}
                  className="cursor-pointer bg-white hover:bg-gray dark:bg-boxdark  dark:text-white dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap border-b border-[#eee] px-6 py-4 font-medium text-gray-900 dark:border-strokedark dark:text-white"
                  >
                    {student.name} {student.first_name}
                  </th>
                  <td className="border-b border-[#eee] px-6 py-4 dark:border-strokedark">
                    {student.date_of_birth}
                  </td>
                  <td className="border-b border-[#eee] px-6 py-4 dark:border-strokedark">
                    {student.gender}
                  </td>
                  <td className=" border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button className="hover:text-primary">
                        <ViewStudent />
                      </button>
                      <button className="hover:text-primary">
                        <Delete />
                      </button>
                      <button className="hover:text-primary">
                        <Edit />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
