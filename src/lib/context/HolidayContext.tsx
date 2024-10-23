"use client";
import React, { createContext, useContext } from "react";
import {
  useAddHolidayMutation,
  useDeleteHolidayMutation,
  useUpdateHolidayMutation,
} from "../api/holidayApi";
import { useSnackbar } from "./SnackbarContext";
const HolidayContext = createContext<any | null>(null);
function HolidayProvider({ children }: { children: React.ReactNode }) {
  // utilisation du context snackbar
  const { showSnackbar } = useSnackbar();
  // CRUD RTK Query
  const [addHoliday, responseAddHoliday] = useAddHolidayMutation();
  const [updateHoliday, responseUpdateHoliday] = useUpdateHolidayMutation();
  const [deleteHoliday, responseDeleteHoliday] = useDeleteHolidayMutation();
  async function handleCreateHoliday(newHoliday: any) {
    try {
      await addHoliday(newHoliday).unwrap();
      showSnackbar("Jours férié créé avec succès", "success");
    } catch (err: any) {
      const message = err?.data?.message;
      showSnackbar(message, "error");
    }
  }
  async function handleUpdateHoliday(updatePermi: any, id: any) {
    try {
      await updateHoliday({ updateHoliday: updatePermi, id }).unwrap();
      showSnackbar("Jours férié mis à jour avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la mise à jour du du jours férié", "error");
    }
  }
  async function handleDeleteHoliday(id: any) {
    try {
      await deleteHoliday(id).unwrap();
      showSnackbar("Jours férié supprimé avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la suppression du du jours férié", "error");
    }
  }

  return (
    <HolidayContext.Provider
      value={{
        responseAddHoliday,
        handleDeleteHoliday,
        responseUpdateHoliday,
        handleCreateHoliday,
        handleUpdateHoliday,
      }}
    >
      {children}
    </HolidayContext.Provider>
  );
}
function useHolidayContext() {
  const context = useContext(HolidayContext);
  if (context === undefined)
    throw new Error("HolidayContext was used outside the HolidayProvider");
  return context;
}
export { HolidayProvider, useHolidayContext };
