import Loading from "@/components/Loading/Loading";
import { StoreProvider } from "./StoreProvider";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import SnackbarProvider from "@/lib/context/SnackbarContext";
import { Metadata } from "next/types";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
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
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <SnackbarProvider>
            <Loading>{children}</Loading>
          </SnackbarProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
