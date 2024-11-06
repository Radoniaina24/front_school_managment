"use client";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Student from "@/interface/Student";
import Input from "@/components/Form/Input";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import SelectGender from "@/components/SelectGroup/SelectGender";
import { useAddStudentMutation } from "@/lib/api/studentApi";
import { useSnackbar } from "@/lib/context/SnackbarContext";
import Spinner from "@/components/spinner/Spinner";
import { useRouter } from "next/navigation";
import SelectClasse from "./selectedClasse";
import InputFile from "@/components/Form/InputFile";
const StudentSchema = yup.object({
  name: yup.string().required("Ce champ est requis"),
  first_name: yup.string().required("Ce champ est requis"),
  gender: yup.string().required("Ce champ est requis"),
  address: yup.string().required("Ce champ est requis"),
  date_of_birth: yup.string().required("Ce champ est requis"),
  submission: yup.string().required("Ce champ est requis"),
  phone: yup.number().typeError("Vous devez entrez un numéro téléphone valide"),
  mother_name: yup.string().required("Ce champ est requis"),
  mother_occupation: yup.string().required("Ce champ est requis"),
  mother_phone: yup
    .number()
    .typeError("Vous devez entrez un numéro téléphone valide")
    .required("Ce champ est requis"),

  father_name: yup.string().required("Ce champ est requis"),
  father_occupation: yup.string().required("Ce champ est requis"),
  father_phone: yup
    .number()
    .typeError("Vous devez entrez un numéro téléphone valide")
    .required("Ce champ est requis"),

  mail: yup.string().email("Assurez-vous que le courriel est valide."),
  classe: yup.string().required("Ce champ est requis"),
  photo: yup
    .mixed()
    .nullable()
    .test("fileFormat", "Seules les images sont acceptées", (value: any) => {
      // Accepte une valeur vide (non obligatoire)
      if (!value || value.length === 0) return true;

      // Vérifie le type de fichier s'il y a une valeur
      return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
    }),
});

const initialValues: Omit<Student, "_id"> = {
  photo: "",
  name: "",
  first_name: "",
  gender: "Garçon",
  date_of_birth: new Date().toLocaleDateString(),
  classe: "",
  address: "",
  phone: "",
  mail: "",
  mother_name: "",
  mother_occupation: "",
  mother_phone: "",
  father_name: "",
  father_occupation: "",
  father_phone: "",
  submission: new Date().toLocaleDateString(),
};
export default function FormStudent() {
  const navigation = useRouter();
  const { showSnackbar } = useSnackbar();
  const [addStudent, responseAddStudent] = useAddStudentMutation();
  async function handleRegisterUser(newStudent: any) {
    try {
      const response = await addStudent(newStudent).unwrap();
      showSnackbar(response?.message, "success"); // message, type(error, success)
      navigation.push("/student");
    } catch (error: any) {
      if (error?.data?.message) {
        showSnackbar(error?.data?.message, "error");
      } else {
        showSnackbar("Verifier votre connexion internet", "error");
      }
    }
  }
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
  async function onSubmit(value: Omit<Student, "_id">) {
    const formData = new FormData();
    formData.append("photo", value.photo);
    formData.append("name", value.name);
    formData.append("first_name", value.first_name);
    formData.append("gender", value.gender);
    formData.append("date_of_birth", value.date_of_birth);
    formData.append("classe", value.classe);
    formData.append("address", value.address);
    formData.append("phone", value.phone);
    formData.append("mail", value.mail);
    formData.append("mother_name", value.mother_name);
    formData.append("mother_occupation", value.mother_occupation);
    formData.append("mother_phone", value.mother_phone);
    formData.append("father_name", value.father_name);
    formData.append("father_occupation", value.father_occupation);
    formData.append("father_phone", value.father_phone);
    formData.append("submission", value.submission);

    handleRegisterUser(formData);
    resetForm();
  }

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
            <SelectClasse
              label="Classe"
              onChange={handleChange}
              value={values.classe}
              error={errors.classe}
              touched={touched.classe}
              id="classe"
            />
            <SelectGender
              label="Sexe"
              onChange={handleChange}
              value={values.gender}
              id="gender"
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
          <div className="mb-4 mt-4">
            <DatePickerOne
              label="Date de soumission"
              id="submission"
              value={values.submission}
              setFieldValue={setFieldValue}
              touched={errors.submission}
              error={errors.submission}
            />
          </div>
          <InputFile
            label="Photo de profil"
            setFieldValue={setFieldValue}
            name="photo"
            error={errors.photo}
            touched={touched.photo}
          />
          {responseAddStudent.isLoading ? (
            <Spinner />
          ) : (
            <div className="mt-5 grid">
              <button
                type="submit"
                className="cursor-pointer rounded-lg border border-stroke  bg-success px-4 py-2 text-white outline-none transition hover:bg-opacity-90 dark:border-form-strokedark"
              >
                Enregistrer
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
