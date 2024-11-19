"use client";
import React from "react";
import { useGetAllClasseQuery } from "@/lib/api/classeApi";

interface SelectClasseProps {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: any;
  id: string;
  error?: any;
  touched?: any;
}

const SelectClasse: React.FC<SelectClasseProps> = ({
  label,
  onChange,
  value,
  id,
  error,
  touched,
}) => {
  const { data, isLoading } = useGetAllClasseQuery("");
  const classes = data?.classes || [];
  // Rendu conditionnel du contenu principal
  const renderContent = () => {
    if (isLoading) {
      return (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Chargement des classes...
        </p>
      );
    }

    if (classes.length === 0) {
      return (
        <div className="rounded-md border border-gray-300 bg-gray-50 p-4 dark:bg-gray-800">
          <p className="text-gray-700 dark:text-gray-300">
            🚨 <strong>Aucune classe disponible.</strong> Veuillez en créer une
            pour continuer.
          </p>
          <button
            className="mt-2 rounded bg-blue-500 px-4 py-2 "
            onClick={() => (window.location.href = "/classe")}
          >
            ➕ Ajouter une classe
          </button>
        </div>
      );
    }

    return (
      <select
        id={id}
        value={value?.level || value || ""}
        onChange={onChange}
        className="w-full appearance-none rounded border border-stroke bg-transparent px-5 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      >
        <option value="" disabled>
          Veuillez sélectionner une classe
        </option>
        {classes.map((item: any) => (
          <option key={item?._id} value={item?.level}>
            {item.level}
          </option>
        ))}
      </select>
    );
  };
  return (
    <div className="mb-1">
      <label htmlFor={id} className="mb-2.5 block text-black dark:text-white">
        {label}
      </label>
      <div className="relative z-20 bg-transparent dark:bg-form-input">
        {renderContent()}
        {error && touched && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default SelectClasse;
