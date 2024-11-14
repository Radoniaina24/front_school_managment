"use client";
import Classe from "@/interface/Classe";
import { useGetClasseQuery } from "@/lib/api/classeApi";
import { TrashIcon } from "@heroicons/react/24/outline";
import React from "react";
import DeleteButton from "./DeleteButton";
import Loader from "@/components/common/Loader";
export default function ListClasse() {
  const { data, isLoading, error } = useGetClasseQuery("");
  const classes = data?.classes;
  if (isLoading) {
    return <Loader />;
  }
  if (classes.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
        <h2>
          Il n&apos;y a pas encore de classe existante, merci d&apos;en ajouter
          une
        </h2>
      </div>
    );
  }
  return (
    <div>
      <ul className="mt-5 h-screen divide-y overflow-y-auto dark:divide-gray-700">
        {classes?.map((item: Classe) => (
          <ListItem classe={item} key={item._id} />
        ))}
      </ul>
    </div>
  );
}

function ListItem({ classe }: { classe: Classe }) {
  return (
    <li className="whitespace-nowrap border-b border-[#eee] px-6 py-4  font-semibold text-gray-900 dark:border-strokedark dark:text-white">
      <div className="flex items-center justify-between">
        <div>{classe.level}</div>
        <div>
          <DeleteButton id={classe._id} />
        </div>
      </div>
    </li>
  );
}
