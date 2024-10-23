import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React from "react";
import { Metadata } from "next/types";
import Loading from "@/components/Loading/Loading";
import { StoreProvider } from "./StoreProvider";

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "Intello",
    template: "%s | Intello",
  },
  description: "...",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <Loading>{children}</Loading>
        </body>
      </html>
    </StoreProvider>
  );
}
