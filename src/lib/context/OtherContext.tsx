"use client";
import Other from "@/app/interface/other";
import React, { createContext, useContext } from "react";
import {
  useAddOtherMutation,
  useDeleteOtherMutation,
  useUpdateOtherMutation,
} from "../api/otherApi";
import { useSnackbar } from "./SnackbarContext";
const OtherContext = createContext<any | null>(null);
function OtherProvider({ children }: { children: React.ReactNode }) {
  // utilisation du context snackbar
  const { showSnackbar } = useSnackbar();
  // CRUD RTK Query
  const [addOther, responseAddOther] = useAddOtherMutation();
  const [updateOther, responseUpdateOther] = useUpdateOtherMutation();
  const [deleteOther, responseDeleteOther] = useDeleteOtherMutation();
  async function handleCreateOther(newOther: any) {
    try {
      await addOther(newOther).unwrap();
      showSnackbar("Other créé avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la creation du paramètre", "error");
    }
  }
  async function handleUpdateOther(updatePermi: any) {
    try {
      await updateOther(updatePermi).unwrap();
      showSnackbar("Other mis à jour avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la mise à jour du paramètre", "error");
    }
  }
  async function handleDeleteOther(id: any) {
    try {
      await deleteOther(id).unwrap();
      showSnackbar("Other supprimé avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la suppression du paramètre", "error");
    }
  }
  return (
    <OtherContext.Provider
      value={{
        responseAddOther,
        handleDeleteOther,
        responseUpdateOther,
        handleCreateOther,
        handleUpdateOther,
      }}
    >
      {children}
    </OtherContext.Provider>
  );
}
function useOtherContext() {
  const context = useContext(OtherContext);
  if (context === undefined)
    throw new Error("OtherContext was used outside the OtherProvider");
  return context;
}
export { OtherProvider, useOtherContext };
