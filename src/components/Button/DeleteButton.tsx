import Modal from "@/features/student/Modal";
import Delete from "@/features/student/svg/delete";
import { useSnackbar } from "@/lib/context/SnackbarContext";
import { Button } from "flowbite-react";
import React, { useState } from "react";

interface DeleteButtonProps {
  id: string;
  onDelete: (id: string) => Promise<void>;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, onDelete }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { showSnackbar } = useSnackbar();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleDelete = async () => {
    try {
      await onDelete(id);
      showSnackbar("Supprimé avec succès", "success");
      closeModal();
    } catch (error) {
      showSnackbar(
        "Une erreur s'est produite lors de la suppression.",
        "error",
      );
    }
  };

  return (
    <div>
      <button onClick={openModal} className="hover:text-red-500">
        <Delete />
      </button>

      {isModalOpen && (
        <Modal open={isModalOpen} onClose={closeModal}>
          <div className="w-56 text-center">
            <div className="mx-auto my-4 w-48">
              <h3 className="text-lg font-semibold text-gray-800">
                Confirmer la suppression
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Êtes-vous sûr de vouloir supprimer cet élément ?
              </p>
            </div>
            <div className="mt-5 flex justify-center gap-4">
              <Button size="sm" color="red" onClick={handleDelete}>
                Supprimer
              </Button>
              <Button size="sm" color="gray" onClick={closeModal}>
                Annuler
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default DeleteButton;
