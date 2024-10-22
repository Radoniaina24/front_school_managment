import FormStudent from "@/features/student/FormStudent";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Add-students",
};
export default function page() {
  return (
    <div>
      <FormStudent />
    </div>
  );
}
