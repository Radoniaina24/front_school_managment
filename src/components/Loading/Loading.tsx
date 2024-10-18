"use client";
import React, { useEffect, useState } from "react";
import Loader from "../common/Loader";
import DefaultLayout from "../Layouts/DefaultLayout";

export default function Loading({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {loading ? <Loader /> : <DefaultLayout>{children}</DefaultLayout>}
    </div>
  );
}
