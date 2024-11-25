"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "@/lib/features/auth/authSlice";
import { usePathname, useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = useSelector(selectToken); // État d'authentification
  const pathname = usePathname(); // Récupère l'URL actuelle
  const router = useRouter();
  const [tokenStorage, setTokenStorage] = useState(
    localStorage.getItem("token") || null,
  );
  useEffect(() => {
    if (tokenStorage === undefined) {
      return; // Attente de la résolution de l'état
    }
    if (!tokenStorage && pathname !== "/login") {
      // Redirige les utilisateurs non authentifiés vers la page de connexion
      router.replace("/login");
    }
  }, [tokenStorage, pathname, router]);
  if (!tokenStorage) return;
  return <>{children}</>;
}
