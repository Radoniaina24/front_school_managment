"use client";
import Classe from "@/interface/Classe";
import * as yup from "yup";
import React from "react";
import { useFormik } from "formik";
import Input from "@/components/Form/Input";
import { Button } from "flowbite-react";
import { useSnackbar } from "@/lib/context/SnackbarContext";
import { useAddClasseMutation } from "@/lib/api/classeApi";
// Validation Schema
const classeSchema = yup.object({
  level: yup.string().required("Ce champ est requis"),
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
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="">
        <Input
          label=""
          type="text"
          id="level"
          value={values.level}
          onChange={handleChange}
          error={errors.level}
          touched={touched.level}
          placeholder="Nom de la classe"
        />
        <Button size="sm" className="bg-success" type="submit">
          Ajouter une classe
        </Button>
      </div>
    </form>
  );
}
