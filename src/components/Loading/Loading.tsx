"use client";
import React, { useEffect, useState } from "react";
import Loader from "../common/Loader";
import DefaultLayout from "../Layouts/DefaultLayout";
import Login from "../Login/Login";

export default function Loading({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const auth = isAuthenticated ? (
    <DefaultLayout>{children}</DefaultLayout>
  ) : (
    <Login />
  );
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {loading ? <Loader /> : auth}
    </div>
  );
}
