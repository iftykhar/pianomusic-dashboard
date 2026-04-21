"use client";
import React, { useState } from "react";
import { useInstruments } from "@/features/instruments/hooks/useInstruments";
import { useInstrumentsMutations } from "@/features/instruments/hooks/useInstrumentsMutations";
import InstrumentsTable from "@/features/instruments/components/InstrumentsTable";
import InstrumentsTableSkeleton from "@/features/instruments/components/InstrumentsTableSkeleton";
import InstrumentModal from "@/features/instruments/components/InstrumentModal";
import DeleteConfirmModal from "@/features/instruments/components/DeleteConfirmModal";
import { Instrument } from "@/features/instruments/type";

const InstrumentsPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useInstruments(page, limit);
  const { createMutation, updateMutation, deleteMutation } =
    useInstrumentsMutations();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstrument, setSelectedInstrument] =
    useState<Instrument | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [instrumentToDelete, setInstrumentToDelete] =
    useState<Instrument | null>(null);

  const handleEdit = (instrument: Instrument) => {
    setSelectedInstrument(instrument);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedInstrument(null);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (instrument: Instrument) => {
    setInstrumentToDelete(instrument);
    setIsDeleteModalOpen(true);
  };

  const handleModalSubmit = async (formData: FormData) => {
    if (selectedInstrument) {
      updateMutation.mutate(
        { id: selectedInstrument._id, data: formData },
        {
          onSuccess: () => setIsModalOpen(false),
        },
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => setIsModalOpen(false),
      });
    }
  };

  const handleConfirmDelete = () => {
    if (instrumentToDelete) {
      deleteMutation.mutate(instrumentToDelete._id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setInstrumentToDelete(null);
        },
      });
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 bg-red-50 rounded-3xl border border-red-100">
        <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Error loading instruments
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          We encountered an issue while fetching the instruments. Please check
          your connection and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {isLoading ? (
        <>
          <div className="flex flex-col gap-2 mb-8">
            <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-md" />
            <div className="h-4 w-64 bg-gray-100 animate-pulse rounded-md" />
          </div>
          <InstrumentsTableSkeleton />
        </>
      ) : (
        <InstrumentsTable
          data={data?.data?.instruments || []}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onAdd={handleAdd}
          pagination={{
            currentPage: data?.data?.meta?.currentPage || 1,
            totalPages: data?.data?.meta?.totalPages || 1,
            totalItems: data?.data?.meta?.totalItems || 0,
            onPageChange: (p) => setPage(p),
          }}
        />
      )}

      {/* Create/Update Modal */}
      <InstrumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
        initialData={selectedInstrument}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
        title={instrumentToDelete?.instrumentTitle || ""}
      />
    </div>
  );
};

export default InstrumentsPage;
