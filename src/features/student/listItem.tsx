import Student from "@/interface/Student";
import React from "react";
import ViewStudent from "./svg/view";
import Edit from "./svg/edit";
import Classe from "@/interface/Classe";
import DeleteButton from "./DeleteButton";

export default function ListItem({ student }: { student: Student }) {
  return (
    <tr className="cursor-pointer bg-white hover:bg-gray dark:bg-boxdark  dark:text-white dark:hover:bg-gray-600">
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
        {student?.classe?.length > 0
          ? student.classe.map((item: Classe) => item.level)
          : "-"}
      </td>
      <td className=" border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <div className="flex items-center space-x-3.5">
          <button className="hover:text-primary">
            <ViewStudent />
          </button>
          <DeleteButton id={student._id} />
          <button className="hover:text-primary">
            <Edit />
          </button>
        </div>
      </td>
    </tr>
  );
}
