"use client";
import React, { createContext, useContext } from "react";
import {
  useAddMailMutation,
  useDeleteMailMutation,
  useUpdateMailMutation,
} from "../api/mailApi";
import { useSnackbar } from "./SnackbarContext";
const MailContext = createContext<any | null>(null);
function MailProvider({ children }: { children: React.ReactNode }) {
  // utilisation du context snackbar
  const { showSnackbar } = useSnackbar();
  // CRUD RTK Query
  const [addMail, responseAddMail] = useAddMailMutation();
  const [updateMail, responseUpdateMail] = useUpdateMailMutation();
  const [deleteMail, responseDeleteMail] = useDeleteMailMutation();
  async function handleCreateMail(newMail: any) {
    try {
      await addMail(newMail).unwrap();
      showSnackbar("Mail créé avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la creation du mail", "error");
    }
  }
  async function handleUpdateMail(updatePermi: any, id: any) {
    try {
      await updateMail({ updateMail: updatePermi, id }).unwrap();
      showSnackbar("Mail mis à jour avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la mise à jour du mail", "error");
    }
  }
  async function handleDeleteMail(id: any) {
    try {
      await deleteMail(id).unwrap();
      showSnackbar("Mail supprimé avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la suppression du mail", "error");
    }
  }

  return (
    <MailContext.Provider
      value={{
        responseAddMail,
        handleDeleteMail,
        responseUpdateMail,
        handleCreateMail,
        handleUpdateMail,
      }}
    >
      {children}
    </MailContext.Provider>
  );
}
function useMailContext() {
  const context = useContext(MailContext);
  if (context === undefined)
    throw new Error("MailContext was used outside the MailProvider");
  return context;
}
export { MailProvider, useMailContext };
