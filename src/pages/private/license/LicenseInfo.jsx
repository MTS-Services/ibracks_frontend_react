import { useState, useEffect } from "react";
import { PageHeader } from "./components/PageHeader";
import { LicensePackList } from "./components/LicensePackList";
import { LicenseForm } from "./components/LicenseForm";
import { ConfirmationModal } from "./components/ConfirmationModal";
import { useLicenseManager } from "./components/useLicenseManager";

const LicenseInfo = () => {
  const { packs, isLoading, fetchPacks, createPack, updatePack, deletePack } =
    useLicenseManager();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPack, setEditingPack] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [packToDeleteId, setPackToDeleteId] = useState(null);

  useEffect(() => {
    fetchPacks();
  }, [fetchPacks]);

  const handleCreateClick = () => {
    setEditingPack(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (pack) => {
    setEditingPack(pack);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPack(null);
  };

  const handleFormSubmit = async (formData) => {
    let success = false;
    if (editingPack) {
      success = await updatePack(editingPack.id, formData);
    } else {
      success = await createPack(formData);
    }
    if (success) {
      handleCloseForm();
    }
  };

  const handleDeleteRequest = (packId) => {
    setPackToDeleteId(packId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (packToDeleteId) {
      deletePack(packToDeleteId);
    }
    setIsDeleteModalOpen(false);
    setPackToDeleteId(null);
  };

  return (
    <div className="p-4 md:p-8">
      <PageHeader onCreateClick={handleCreateClick} />

      {isLoading && (
        <p className="text-center text-gray-400">Loading packs...</p>
      )}

      {!isLoading && packs.length > 0 && (
        <LicensePackList
          packs={packs}
          onEdit={handleEditClick}
          onDelete={handleDeleteRequest}
        />
      )}

      <LicenseForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        initialData={editingPack}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete License Pack?"
      >
        <p className="text-gray-300">
          Are you sure you want to delete this pack? This action cannot be
          undone.
        </p>
      </ConfirmationModal>
    </div>
  );
};

export default LicenseInfo;
