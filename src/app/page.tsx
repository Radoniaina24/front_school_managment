import { Metadata } from "next";
import Profile from "./profile/page";
import Dashboard from "@/components/Dashboard/Dashboard";

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
