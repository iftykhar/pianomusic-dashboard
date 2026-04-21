"use client";
import React, { useState, useMemo } from "react";
import { useInstruments } from "@/features/instruments/hooks/useInstruments";
import { useModules } from "@/features/modules/hooks/useModules";
import { useModulesMutations } from "@/features/modules/hooks/useModulesMutations";
import ModulesTable from "@/features/modules/components/ModulesTable";
import ModulesTableSkeleton from "@/features/modules/components/ModulesTableSkeleton";
import ModuleModal from "@/features/modules/components/ModuleModal";
import ModuleDeleteConfirmModal from "@/features/modules/components/ModuleDeleteConfirmModal";
import { Module } from "@/features/modules/type";
import { Instrument } from "@/features/instruments/type";
import Image from "next/image";
import {
  Music,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Package,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const ManageModulePage = () => {
  const [selectedInstrumentId, setSelectedInstrumentId] = useState<string>("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all instruments for selection
  const { data: instrumentsData, isLoading: isInstrumentsLoading } =
    useInstruments(1, 100);
  const instruments = useMemo(
    () => instrumentsData?.data?.instruments || [],
    [instrumentsData],
  );

  // Fetch modules for selected instrument
  const {
    data: modulesData,
    isLoading: isModulesLoading,
    error: modulesError,
  } = useModules(selectedInstrumentId, page, limit);
  console.log("modulesData", modulesData);

  const { createMutation, updateMutation, deleteMutation } =
    useModulesMutations(selectedInstrumentId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState<Module | null>(null);

  const filteredInstruments = useMemo(() => {
    return instruments.filter((inst) =>
      inst.instrumentTitle.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [instruments, searchTerm]);

  const handleEdit = (module: Module) => {
    setSelectedModule(module);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedModule(null);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (module: Module) => {
    setModuleToDelete(module);
    setIsDeleteModalOpen(true);
  };

  const handleModalSubmit = async (formData: FormData) => {
    if (selectedModule) {
      updateMutation.mutate(
        { id: selectedModule._id, data: formData },
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
    if (moduleToDelete) {
      deleteMutation.mutate(moduleToDelete._id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setModuleToDelete(null);
        },
      });
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Manage Curriculum
          </h1>
          <p className="text-gray-500 font-medium italic">
            Select an instrument to view and manage its modules
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search instruments..."
              className="pl-10 h-11 w-64 border-gray-200 rounded-xl focus:ring-orange-500 focus:border-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="h-11 w-11 flex items-center justify-center border border-gray-200 rounded-xl text-gray-400 hover:text-orange-600 hover:bg-orange-50 transition-all">
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Instruments Selection Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center gap-2 mb-2 px-2">
            <Music className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-gray-900 uppercase tracking-widest text-xs">
              Instruments
            </h3>
          </div>

          <div className="space-y-2 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
            {isInstrumentsLoading ? (
              [1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-16 w-full bg-gray-100 animate-pulse rounded-2xl"
                />
              ))
            ) : filteredInstruments.length > 0 ? (
              filteredInstruments.map((instrument) => (
                <button
                  key={instrument._id}
                  onClick={() => {
                    setSelectedInstrumentId(instrument._id);
                    setPage(1);
                  }}
                  className={cn(
                    "w-full relative h-24 rounded-2xl transition-all duration-300 group overflow-hidden border shadow-sm",
                    selectedInstrumentId === instrument._id
                      ? "ring-4 ring-orange-200 border-orange-500 shadow-orange-600/20"
                      : "bg-white border-gray-100 hover:border-orange-200",
                  )}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    {instrument.instrumentImage?.url ? (
                      <Image
                        src={instrument.instrumentImage.url}
                        alt={instrument.instrumentTitle}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-orange-100" />
                    )}
                  </div>

                  {/* Overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 z-10 transition-all duration-300",
                      selectedInstrumentId === instrument._id
                        ? "bg-orange-600/60 backdrop-blur-[1px]"
                        : "bg-black/40 group-hover:bg-black/30",
                    )}
                  />

                  {/* Content */}
                  <div className="relative z-20 h-full flex items-center justify-between px-5 text-white">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-sm">
                        {instrument.instrumentTitle.charAt(0)}
                      </div>
                      <span className="font-black text-sm uppercase tracking-wider drop-shadow-md">
                        {instrument.instrumentTitle}
                      </span>
                    </div>
                    <ChevronRight
                      className={cn(
                        "w-5 h-5 transition-all duration-300 drop-shadow-md",
                        selectedInstrumentId === instrument._id
                          ? "translate-x-1 opacity-100 scale-110"
                          : "opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100",
                      )}
                    />
                  </div>
                </button>
              ))
            ) : (
              <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-8 text-center">
                <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 font-bold text-sm">
                  No instruments
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modules Content Area */}
        <div className="lg:col-span-3">
          {!selectedInstrumentId ? (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-[32px] min-h-[500px] flex flex-col items-center justify-center text-center p-12">
              <div className="h-24 w-24 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-6 animate-bounce">
                <Music className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">
                Select an Instrument
              </h3>
              <p className="text-gray-500 max-w-sm font-medium italic">
                Choose an instrument from the left sidebar to manage its
                curriculum modules and lessons.
              </p>
            </div>
          ) : isModulesLoading ? (
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-md" />
                <div className="h-4 w-64 bg-gray-100 animate-pulse rounded-md" />
              </div>
              <ModulesTableSkeleton />
            </div>
          ) : modulesError ? (
            <div className="bg-rose-50 border border-rose-100 rounded-[32px] p-12 text-center">
              <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-rose-900 mb-2">
                Error Loading Modules
              </h3>
              <p className="text-rose-600 italic">
                We couldn&apos;t fetch modules for this instrument. Please try
                again later.
              </p>
            </div>
          ) : (
            <div className="animate-in slide-in-from-right-8 duration-500">
              <ModulesTable
                data={modulesData?.data || []}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                onAdd={handleAdd}
                pagination={{
                  currentPage: modulesData?.meta?.currentPage || 1,
                  totalPages: modulesData?.meta?.totalPages || 1,
                  totalItems: modulesData?.meta?.totalItems || 0,
                  onPageChange: (p) => setPage(p),
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ModuleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
        initialData={selectedModule}
        instruments={instruments}
      />

      <ModuleDeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
        title={moduleToDelete?.title || ""}
      />
    </div>
  );
};

export default ManageModulePage;
