import { Metadata } from "next";
import Profile from "./profile/page";

export const metadata: Metadata = {
  title: "Dashboard | Intello",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
  return (
    <>
      <Profile />
    </>
  );
}
