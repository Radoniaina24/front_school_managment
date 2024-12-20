import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ListStudent from "@/features/student/list";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Students",
};
export default function page() {
  return (
    <DefaultLayout>
      <ListStudent />
    </DefaultLayout>
  );
}
