import { Metadata } from "next";
import Profile from "./profile/page";
import Dashboard from "@/components/Dashboard/Dashboard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard | Intello",
};

export default function Home() {
  return (
    <>
      <Dashboard />
    </>
  );
}
