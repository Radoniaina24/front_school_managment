"use client";
import React, { createContext, useContext } from "react";
import {
  useAddPermissionMutation,
  useDeletePermissionMutation,
  useUpdatePermissionMutation,
} from "../api/permissionApi";
import { useSnackbar } from "./SnackbarContext";
const PermissionContext = createContext<any | null>(null);
function PermissionProvider({ children }: { children: React.ReactNode }) {
  // utilisation du context snackbar
  const { showSnackbar } = useSnackbar();
  // CRUD RTK Query
  const [addPermission, responseAddPermission] = useAddPermissionMutation();
  const [updatePermission, responseUpdatePermission] =
    useUpdatePermissionMutation();
  const [deletePermission, responseDeletePermission] =
    useDeletePermissionMutation();
  async function handleCreatePermission(newPermission: any) {
    try {
      await addPermission(newPermission).unwrap();
      showSnackbar("Permission créé avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la creation du permission", "error");
    }
  }
  async function handleUpdatePermission(updatePermi: any, id: any) {
    try {
      await updatePermission({ updatePermission: updatePermi, id }).unwrap();
      showSnackbar("Permission mis à jour avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la mise à jour du permission", "error");
    }
  }
  async function handleDeletePermission(id: any) {
    try {
      await deletePermission(id).unwrap();
      showSnackbar("Permission supprimé avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la suppression du permission", "error");
    }
  }

  return (
    <PermissionContext.Provider
      value={{
        responseAddPermission,
        handleDeletePermission,
        responseUpdatePermission,
        handleCreatePermission,
        handleUpdatePermission,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
}
function usePermissionContext() {
  const context = useContext(PermissionContext);
  if (context === undefined)
    throw new Error(
      "PermissionContext was used outside the PermissionProvider"
    );
  return context;
}
export { PermissionProvider, usePermissionContext };
