import Loading from "@/components/Loading/Loading";
import { StoreProvider } from "./StoreProvider";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import SnackbarProvider from "@/lib/context/SnackbarContext";
import { Metadata } from "next/types";
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
    <html lang="en">
      <body>
        <StoreProvider>
          <SnackbarProvider>
            <Loading>{children}</Loading>
          </SnackbarProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
