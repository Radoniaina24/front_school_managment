"use client";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Student from "@/interface/Student";
import Input from "@/components/Form/Input";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
const StudentSchema = yup.object({
  name: yup.string().required("Ce champ est requis"), //ok
  first_name: yup.string().required("Ce champ est requis"), //ok
  gender: yup.string().required("Ce champ est requis"),
  address: yup.string().required("Ce champ est requis"), //ok
  date_of_birth: yup.string().required("Ce champ est requis"), //ok

  mother_name: yup.string().required("Ce champ est requis"), //ok
  mother_occupation: yup.string().required("Ce champ est requis"), //ok
  mother_phone: yup.string().required("Ce champ est requis"), //ok

  father_name: yup.string().required("Ce champ est requis"), //ok
  father_occupation: yup.string().required("Ce champ est requis"), //ok
  father_phone: yup.string().required("Ce champ est requis"), //ok

  mail: yup.string().email("Assurez-vous que le courriel est valide."),
});
const initialValues: Omit<Student, "_id"> = {
  name: "", //ok
  first_name: "", //ok
  gender: "",
  date_of_birth: "", //ok
  classe: "",
  address: "", //ok
  phone: "", //ok
  mail: "", //ok
  mother_name: "", //ok
  mother_occupation: "", //ok
  mother_phone: "", //ok
  father_name: "", //ok
  father_occupation: "", //ok
  father_phone: "", //ok
  submission: new Date().toLocaleDateString(),
};
export default function FormStudent() {
  const formik = useFormik({
    initialValues,
    validationSchema: StudentSchema,
    onSubmit,
  });
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    resetForm,
    setFieldValue,
  } = formik;
  console.log(values.date_of_birth);
  async function onSubmit() {}
  return (
    <>
      <Breadcrumb pageName={"Add student"} />
      <div className="rounded-sm border border-stroke bg-white px-5 py-5  shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              type="text"
              label="Nom"
              id="name"
              value={values.name}
              onChange={handleChange}
              error={errors.name}
              touched={touched.name}
              placeholder="Nom de  famille"
            />
            <Input
              type="text"
              label="Prénom"
              id="first_name"
              value={values.first_name}
              onChange={handleChange}
              error={errors.first_name}
              touched={touched.first_name}
              placeholder="Prénom"
            />
            <DatePickerOne
              label="Date de naissance"
              id="date_of_birth"
              value={values.date_of_birth}
              setFieldValue={setFieldValue}
              touched={errors.date_of_birth}
              error={errors.date_of_birth}
              onChange={handleChange}
            />

            <Input
              type="text"
              label="Adresse"
              id="address"
              value={values.address}
              onChange={handleChange}
              error={errors.address}
              touched={touched.address}
              placeholder="Antananarivo 101"
            />
            <SelectGroupOne
              label="Classe"
              options={[""]}
              onChange={handleChange}
              value={values.classe}
            />
            <SelectGroupOne
              label="Sexe"
              options={["Fille", "Garçon"]}
              onChange={handleChange}
              value={values.gender}
            />
            <Input
              type="text"
              label="Email"
              id="mail"
              value={values.mail}
              onChange={handleChange}
              error={errors.mail}
              touched={touched.mail}
              placeholder="Adresse email"
            />
            <Input
              type="text"
              label="Téléphone"
              id="phone"
              value={values.phone}
              onChange={handleChange}
              error={errors.phone}
              touched={touched.phone}
              placeholder="Numéro téléphone"
            />
            <Input
              type="text"
              label="Nom du mère"
              id="mother_name"
              value={values.mother_name}
              onChange={handleChange}
              error={errors.mother_name}
              touched={touched.mother_name}
              placeholder="Nom complet"
            />
            <Input
              type="text"
              label="Profession"
              id="mother_occupation"
              value={values.mother_occupation}
              onChange={handleChange}
              error={errors.mother_occupation}
              touched={touched.mother_occupation}
              placeholder="Profession du mère"
            />
            <Input
              type="text"
              label="Téléphone"
              id="mother_phone"
              value={values.mother_phone}
              onChange={handleChange}
              error={errors.mother_phone}
              touched={touched.mother_phone}
              placeholder="Numéro téléphone du mère"
            />
            <Input
              type="text"
              label="Nom du père"
              id="father_name"
              value={values.father_name}
              onChange={handleChange}
              error={errors.father_name}
              touched={touched.father_name}
              placeholder="Nom complet"
            />
            <Input
              type="text"
              label="Profession"
              id="father_occupation"
              value={values.father_occupation}
              onChange={handleChange}
              error={errors.father_occupation}
              touched={touched.father_occupation}
              placeholder="Profession du père"
            />
            <Input
              type="text"
              label="Téléphone"
              id="father_phone"
              value={values.father_phone}
              onChange={handleChange}
              error={errors.father_phone}
              touched={touched.father_phone}
              placeholder="Numéro téléphone du père"
            />
          </div>
          <DatePickerOne
            label="Date de soumission"
            id="submission"
            value={values.submission}
            setFieldValue={setFieldValue}
            touched={errors.submission}
            error={errors.submission}
            onChange={handleChange}
          />
          <button type="submit">Enregistrer</button>
        </form>
      </div>
    </>
  );
}
