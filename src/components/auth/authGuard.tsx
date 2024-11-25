"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authentication } from "@/lib/features/auth/authSlice";
import { usePathname, useRouter } from "next/navigation";
import Loader from "../common/Loader";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector(authentication); // État d'authentification
  const pathname = usePathname(); // Récupère l'URL actuelle
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated === undefined) {
      return; // Attente de la résolution de l'état
    }
    if (!isAuthenticated && pathname !== "/login") {
      // Redirige les utilisateurs non authentifiés vers la page de connexion
      router.replace("/login");
    }
  }, [isAuthenticated, pathname, router]);
  return <>{children}</>;
}
