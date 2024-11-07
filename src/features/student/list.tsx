"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Student from "@/interface/Student";
import { useGetStudentQuery } from "@/lib/api/studentApi";
import React, { useState } from "react";
import SearchBar from "./search";
import Limit from "./limit";
import ListItem from "./listItem";
import Link from "next/link";
import Pagination from "./Pagination";
import DeleteButton from "./DeleteButton";

export default function ListStudent() {
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, error } = useGetStudentQuery({
    search,
    limit,
    page,
  });
  const students = data?.students;
  const totalePages = data?.totalPages;
  return (
    <div>
      <Breadcrumb pageName={"List students"} />
      <div className="rounded-sm border border-stroke bg-white px-5 py-5  shadow-default dark:border-strokedark dark:bg-boxdark">
        <button
          type="submit"
          className="mb-3 cursor-pointer rounded border  border-stroke bg-primary px-4 py-1 text-white outline-none transition hover:bg-opacity-90 dark:border-form-strokedark"
        >
          <Link href="/student/add">Ajouter</Link>
        </button>
        <div className="mb-3 flex flex-wrap items-center justify-between">
          <SearchBar query={search} onQuery={setSearch} />
          <Limit setLimit={setLimit} limit={limit} />
        </div>
        <div
          className="relative  overflow-x-auto overflow-y-auto"
          style={{ height: "350px" }}
        >
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
            <thead className="sticky top-0">
              <tr className=" bg-gray-2 text-left dark:bg-meta-4 dark:text-white">
                <th scope="col" className="px-6 py-3">
                  Photo
                </th>
                <th scope="col" className="px-6 py-3">
                  Nom complet
                </th>
                <th scope="col" className="px-6 py-4">
                  Date de naissance
                </th>
                <th scope="col" className="px-6 py-3">
                  Classe
                </th>
                <th scope="col" className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {students?.length === 0 ? (
                <tr className="">
                  <td
                    rowSpan={8}
                    colSpan={4}
                    className="text-center"
                    style={{ height: "250px" }}
                  >
                    Not Found
                  </td>
                </tr>
              ) : (
                students?.map((student: Student) => (
                  <ListItem key={student._id} student={student} />
                ))
              )}
            </tbody>
          </table>
        </div>
        {/*Pagination*/}
        <div className="mt-5 flex justify-between">
          <h1>Tolale : {data?.totale || 0}</h1>
          <Pagination page={page} totalPage={totalePages} onPage={setPage} />
        </div>
      </div>
    </div>
  );
}