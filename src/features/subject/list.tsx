"use client";
import React from "react";
import Loader from "@/components/common/Loader";
import {
  useDeleteSubjectMutation,
  useGetAllSubjectQuery,
} from "@/lib/api/subjectApi";
import Subject from "@/interface/Subject";
import DeleteButton from "@/components/Button/DeleteButton";
export default function ListSubject() {
  const { data, isLoading, error } = useGetAllSubjectQuery("");

  const subjects = data?.subjects;
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
        <div
          className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
        >
          <strong className="font-bold">
            🚨 Erreur : Problème avec le serveur
          </strong>
          <span className="block sm:inline">
            La liste des matières ne peut pas être affichée pour le moment.
          </span>
          <span className="mt-2 block sm:inline">
            Veuillez vérifier la connexion ou contacter l&apos;équipe technique.
          </span>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return <Loader />;
  }
  if (subjects?.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
        <h2>
          Il n&apos;y a pas encore de matière existante, merci d&apos;en ajouter
          une
        </h2>
      </div>
    );
  }
  return (
    <div>
      <ul className="mt-5 h-screen divide-y overflow-y-auto dark:divide-gray-700">
        {subjects?.map((item: Subject) => (
          <ListItem subject={item} key={item._id} />
        ))}
      </ul>
    </div>
  );
}

function ListItem({ subject }: { subject: Subject }) {
  const [deleteSubject] = useDeleteSubjectMutation();
  return (
    <li className="whitespace-nowrap border-b border-[#eee] px-6 py-4  font-semibold text-gray-900 dark:border-strokedark dark:text-white">
      <div className="flex items-center justify-between">
        <div>{subject.name}</div>
        <div>
          <DeleteButton
            id={subject._id}
            onDelete={(id: string) => deleteSubject(id).unwrap()}
          />
        </div>
      </div>
    </li>
  );
}
