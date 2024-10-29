"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import Delete from "./svg/delete";
import { Button, ButtonGroup } from "flowbite-react";
import { IdentificationIcon } from "@heroicons/react/16/solid";
import { useDeleteStudentMutation } from "@/lib/api/studentApi";
import { useSnackbar } from "@/lib/context/SnackbarContext";

export default function DeleteButton({ id }: { id: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const [deleteStudent, responseDeleteStudent] = useDeleteStudentMutation();
  const { showSnackbar } = useSnackbar();
  async function handleDelete(id: string) {
    try {
      await deleteStudent(id).unwrap();
      showSnackbar("L'étudiant a été supprimé avec succès");
      setOpen(false);
    } catch (error) {
      showSnackbar("Error", "error");
    }
  }
  return (
    <div>
      <button onClick={() => setOpen(true)}>
        <Delete />
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-56 text-center">
          <div className="mx-auto my-4 w-48">
            <h3 className="font-black/20 text-lg text-gray-800">
              Confirmer la suppression
            </h3>
            <p className="mt-2 font-medium text-gray-500">
              Êtes-vous sûr de vouloir supprimer cet étudiant?
            </p>
          </div>
          <div className="mt-5 flex justify-center gap-5">
            <Button
              size="sm"
              className=" bg-danger"
              onClick={() => handleDelete(id)}
            >
              Supprimer
            </Button>
            <Button
              size="sm"
              className=" bg-warning"
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
