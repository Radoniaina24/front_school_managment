"use client";
import Auth from "@/interface/Auth";
import { useLoginMutation } from "@/lib/api/authApi";
import { setCredentials } from "@/lib/features/auth/authSlice";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "@/lib/context/SnackbarContext";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

// Schéma de validation Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
//valeur initial
const initialValues: Auth = {
  email: "",
  password: "",
};
export default function Login() {
  //Notification
  const { showSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  //navigation vers autre page
  const navigation = useRouter();
  // Fonction de soumission
  const Submit = async (values: { email: string; password: string }) => {
    try {
      const userData = await login(values).unwrap();
      dispatch(setCredentials(userData)); // Sauvegarder token et user dans Redux
      navigation.push("/");
    } catch (err) {
      showSnackbar("Mots de passe ou email incorrecte", "error");
    }
  };

  //formik
  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (value) => {
      Submit(value);
    },
  });
  const { handleSubmit, handleChange, values, errors, touched, resetForm } =
    formik;
  const eyes = showPassword ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      width="22"
      height="22"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      width="22"
      height="22"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="flex  h-125 items-center justify-center"
    >
      <div className="mx-5 w-100">
        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              id="email"
              value={values.email}
              onChange={handleChange}
            />

            <span className="absolute right-4 top-4">
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.5">
                  <path
                    d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                    fill=""
                  />
                </g>
              </svg>
            </span>
          </div>
          {errors.email && touched.email ? (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium"></span> {errors.email}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="mb-6">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="6+ Characters, 1 Capital letter"
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              id="password"
              value={values.password}
              onChange={handleChange}
            />

            <span
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {eyes}
            </span>
          </div>
          {errors.password && touched.password ? (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium"></span> {errors.password}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="mb-5">
          <input
            type="submit"
            value="Se connecter"
            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90"
          />
        </div>
      </div>
    </form>
  );
}
