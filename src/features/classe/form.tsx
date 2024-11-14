"use client";
import Classe from "@/interface/Classe";
import * as yup from "yup";
import React from "react";
import { useFormik } from "formik";
import { useSnackbar } from "@/lib/context/SnackbarContext";
import { useAddClasseMutation } from "@/lib/api/classeApi";
// Validation Schema
const classeSchema = yup.object({
  level: yup.string(),
});
// Initial Values
const initialValues: Omit<Classe, "_id"> = {
  level: "",
};
export default function FormClasse() {
  //Notification
  const { showSnackbar } = useSnackbar();
  //RTK query
  const [addClasse, responseAddClasse] = useAddClasseMutation();
  // Formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: classeSchema,
    onSubmit,
  });
  async function onSubmit(value: Omit<Classe, "_id">) {
    if (!value.level) return;
    try {
      const response = await addClasse(value).unwrap();
      showSnackbar(response?.message, "success"); // message, type(error, success)
      resetForm();
    } catch (error: any) {
      if (error?.data?.message) {
        showSnackbar(error?.data?.message, "error");
      } else {
        showSnackbar("Verifier votre connexion internet", "error");
      }
    }
  }
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    resetForm,
    setFieldValue,
  } = formik;
  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="mx-auto flex max-w-lg items-center gap-2"
    >
      <label htmlFor="voice-search" className="sr-only">
        Search
      </label>
      <div className="">
        <input
          type="text"
          id="level"
          value={values.level}
          onChange={handleChange}
          className="rounded border-[1.5px] border-stroke bg-transparent px-5 py-2 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          placeholder="Nom de la classe..."
          required
        />
      </div>
      <button
        type="submit"
        className="ms-2 inline-flex items-center rounded-lg border border-blue-700 bg-success px-3 py-2.5 text-sm font-medium text-white hover:bg-success focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Ajouter
      </button>
    </form>
  );
}