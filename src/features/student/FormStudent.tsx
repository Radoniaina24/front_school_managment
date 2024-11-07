"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Student from "@/interface/Student";
import Input from "@/components/Form/Input";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import SelectGender from "@/components/SelectGroup/SelectGender";
import {
  useAddStudentMutation,
  useUpdateStudentMutation,
} from "@/lib/api/studentApi";
import { useSnackbar } from "@/lib/context/SnackbarContext";
import Spinner from "@/components/spinner/Spinner";
import { useRouter } from "next/navigation";
import InputFile from "@/components/Form/InputFile";
import SelectClasse from "./selectedClasse";

// Validation Schema
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
  classe: yup
    .mixed()
    .test("classe", "Ce champ est requis", (value) => {
      // Vérifiez si la valeur est un objet ou une chaîne non vide
      if (typeof value === "object" && value !== null) {
        return true; // L'objet est valide
      } else if (typeof value === "string" && value.trim() !== "") {
        return true; // La chaîne non vide est valide
      }
      return false; // Si la valeur n'est ni un objet valide ni une chaîne non vide, la validation échoue
    })
    .required("Ce champ est requis"),
  photo: yup
    .mixed()
    .nullable()
    .test("fileFormat", "Seules les images sont acceptées", (value: any) => {
      // Accepte une valeur vide (non obligatoire)
      if (!value) return true;

      // Vérifie le type de fichier s'il y a une valeur
      return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
    }),
});

// Initial Values
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
export default function FormStudent({
  studentEdit,
}: {
  studentEdit?: Student;
}) {
  const navigation = useRouter();
  const { showSnackbar } = useSnackbar();
  const [addStudent, { isLoading: isAdding }] = useAddStudentMutation();
  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();

  // Handlers
  async function handleRegisterStudent(newStudent: FormData) {
    try {
      const response = await addStudent(newStudent).unwrap();
      showSnackbar(response?.message, "success"); // message, type(error, success)
      resetForm();
      navigation.push("/student");
    } catch (error: any) {
      if (error?.data?.message) {
        showSnackbar(error?.data?.message, "error");
      } else {
        showSnackbar("Verifier votre connexion internet", "error");
      }
    }
  }
  async function handleUpdateStudent({
    id,
    student,
  }: {
    id: string;
    student: FormData;
  }) {
    if (!studentEdit) return;
    try {
      const response = await updateStudent({
        updateStudent: student,
        id: id,
      }).unwrap();
      resetForm();
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

  // Formik
  const formik = useFormik({
    initialValues: studentEdit || initialValues,
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
    Object.entries(values).forEach(([key, value]) => {
      if (key === "classe" && typeof value === "object" && value.level) {
        formData.append("classe", value.level);
      } else {
        formData.append(key, value as string | Blob);
      }
    });

    studentEdit
      ? handleUpdateStudent({ id: studentEdit._id, student: formData })
      : handleRegisterStudent(formData);
  }

  useEffect(() => {
    if (studentEdit?.photo) {
      setFieldValue("photo", "");
    }
  }, [studentEdit]);

  return (
    <>
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
          label="Telecharger un photo"
          setFieldValue={setFieldValue}
          name="photo"
          error={errors.photo}
          touched={touched.photo}
        />
        {isAdding || isUpdating ? (
          <Spinner />
        ) : studentEdit ? (
          <div className="mt-5 flex justify-center gap-5">
            <button
              type="submit"
              className="cursor-pointer rounded-lg border border-stroke  bg-success px-4 py-2 text-white outline-none transition hover:bg-opacity-90 dark:border-form-strokedark"
            >
              Modifier
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded-lg border border-stroke  bg-warning px-4 py-2 text-white outline-none transition hover:bg-opacity-90 dark:border-form-strokedark"
            >
              Annuler
            </button>
          </div>
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
    </>
  );
}
