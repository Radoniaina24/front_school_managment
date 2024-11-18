"use client";
import * as yup from "yup";
import React from "react";
import { useFormik } from "formik";
import { useSnackbar } from "@/lib/context/SnackbarContext";
import Subject from "@/interface/Subject";
import { useAddSubjectMutation } from "@/lib/api/subjectApi";
// Validation Schema
const subjectSchema = yup.object({
  name: yup.string().required(),
});
// Initial Values
const initialValues: Omit<Subject, "_id"> = {
  name: "",
};
export default function FormSubject() {
  //Notification
  const { showSnackbar } = useSnackbar();
  //RTK query
  const [addSubject, responseAddSubject] = useAddSubjectMutation();
  // Formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: subjectSchema,
    onSubmit: async (value, { resetForm }) => {
      try {
        const response = await addSubject(value).unwrap();
        showSnackbar(response?.message, "success"); // message, type(error, success)
        resetForm();
      } catch (error: any) {
        const errorMessage =
          error?.data?.message || "Vérifiez votre connexion internet";
        showSnackbar(errorMessage, "error");
      }
    },
  });
  const { values, handleChange, handleSubmit, errors, touched } = formik;
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
          id="name"
          value={values.name}
          onChange={handleChange}
          className={`rounded border-[1.5px]  bg-transparent px-5 py-2 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${errors.name && touched.name ? "border-red-500" : "border-stroke"}`}
          placeholder="Nom de la classe..."
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
