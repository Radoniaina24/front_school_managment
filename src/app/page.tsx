import { Metadata } from "next";
import Profile from "./profile/page";

export const metadata: Metadata = {
  title: "Dashboard | Intello",
};

export default function Home() {
  return (
    <>
      <Profile />
    </>
  );
}
