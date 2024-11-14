"use client";
import { Button } from "flowbite-react";
import Modal from "../student/Modal";
import Delete from "../student/svg/delete";
import { useSnackbar } from "@/lib/context/SnackbarContext";
import { useState } from "react";
import { useDeleteClasseMutation } from "@/lib/api/classeApi";

export default function DeleteButton({ id }: { id: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const [deleteClasse, responseDeleteClasse] = useDeleteClasseMutation();
  const { showSnackbar } = useSnackbar();
  async function handleDelete(id: string) {
    try {
      await deleteClasse(id).unwrap();
      showSnackbar("La classe a été supprimé avec succès");
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
              Êtes-vous sûr de vouloir supprimer cet classe?
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
