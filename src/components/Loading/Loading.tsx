"use client";
import React, { useEffect, useState } from "react";
import Loader from "../common/Loader";

// export default function Loading({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const [loading, setLoading] = useState<boolean>(true);
//   const isAuthenticated = useSelector(authentication);
//   const auth = isAuthenticated ? (
//     <DefaultLayout>{children}</DefaultLayout>
//   ) : (
//     <Login />
//   );
//   useEffect(() => {
//     setTimeout(() => setLoading(false), 1000);
//   }, []);
//   return (
//     <div className="dark:bg-boxdark-2 dark:text-bodydark">
//       {loading ? <Loader /> : auth}
//     </div>
//   );
// }
export default function Loading({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(id);
  }, []);
  return <>{loading ? <Loader /> : children}</>;
}
