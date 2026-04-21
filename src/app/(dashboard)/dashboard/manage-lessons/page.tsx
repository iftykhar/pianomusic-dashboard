"use client";

import React, { useState } from "react";
import { useInstruments } from "@/features/instruments/hooks/useInstruments";
import { useModules } from "@/features/modules/hooks/useModules";
import { useLessons } from "@/features/manage-lessons/hooks/useLessons";
import {
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} from "@/features/manage-lessons/hooks/useLessonsMutations";
import { Lesson } from "@/features/manage-lessons/type";
import { Instrument } from "@/features/instruments/type";
import { Module } from "@/features/modules/type";
import LessonList from "@/features/manage-lessons/components/LessonList";
import LessonModal from "@/features/manage-lessons/components/LessonModal";
import DeleteLessonConfirmModal from "@/features/manage-lessons/components/DeleteLessonConfirmModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import HeaderTitle from "@/components/dashboard/common/Headertitle";

const ManageLessonsPage = () => {
  const [selectedInstrumentId, setSelectedInstrumentId] = useState<string>("");
  const [selectedModuleId, setSelectedModuleId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState<string | null>(null);

  // Fetch Instruments
  const { data: instrumentsResponse, isLoading: isLoadingInstruments } =
    useInstruments(1, 100);

  // Get instruments array from response data
  const instruments = instrumentsResponse?.data?.instruments || [];

  // Fetch Modules based on selected instrument
  const { data: modulesData, isLoading: isLoadingModules } = useModules(
    selectedInstrumentId,
    1,
    100,
  );

  // Fetch Lessons based on selected module
  const { data: lessonsData, isLoading: isLoadingLessons } =
    useLessons(selectedModuleId);

  // Mutations
  const createLessonMutation = useCreateLessonMutation();
  const updateLessonMutation = useUpdateLessonMutation();
  const deleteLessonMutation = useDeleteLessonMutation();

  const handleCreate = () => {
    setEditingLesson(null);
    setIsModalOpen(true);
  };

  const handleEdit = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setLessonToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (lessonToDelete) {
      deleteLessonMutation.mutate(lessonToDelete, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setLessonToDelete(null);
        },
      });
    }
  };

  const handleFormSubmit = (formData: FormData) => {
    if (editingLesson) {
      updateLessonMutation.mutate(
        { id: editingLesson._id, data: formData },
        {
          onSuccess: () => {
            setIsModalOpen(false);
          },
        },
      );
    } else {
      createLessonMutation.mutate(formData, {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      });
    }
  };

  // Reset module selection when instrument changes
  const handleInstrumentChange = (value: string) => {
    setSelectedInstrumentId(value);
    setSelectedModuleId("");
  };

  const isFormLoading =
    createLessonMutation.isPending || updateLessonMutation.isPending;

  return (
    <div className="space-y-6">
      <HeaderTitle title="Manage Lessons" />

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Select Instrument
          </label>
          <Select
            value={selectedInstrumentId}
            onValueChange={handleInstrumentChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose an instrument..." />
            </SelectTrigger>
            <SelectContent>
              {isLoadingInstruments ? (
                <div className="flex items-center justify-center p-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              ) : (
                instruments.map((inst: Instrument) => (
                  <SelectItem key={inst._id} value={inst._id}>
                    {inst.instrumentTitle}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Select Module
          </label>
          <Select
            value={selectedModuleId}
            onValueChange={setSelectedModuleId}
            disabled={!selectedInstrumentId}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a module..." />
            </SelectTrigger>
            <SelectContent>
              {isLoadingModules ? (
                <div className="flex items-center justify-center p-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              ) : modulesData?.data?.length === 0 ? (
                <div className="p-2 text-sm text-gray-500 text-center">
                  No modules found
                </div>
              ) : (
                modulesData?.data?.map((mod: Module) => (
                  <SelectItem key={mod._id} value={mod._id}>
                    {mod.title}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button
            onClick={handleCreate}
            disabled={!selectedModuleId}
            className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/20 w-full md:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" /> Add New Lesson
          </Button>
        </div>
      </div>

      {/* Content Section */}
      {!selectedInstrumentId ? (
        <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-gray-400">
          <p>Please select an instrument to get started.</p>
        </div>
      ) : !selectedModuleId ? (
        <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-gray-400">
          <p>Please select a module to view lessons.</p>
        </div>
      ) : isLoadingLessons ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-40 bg-gray-100 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : (
        <LessonList
          lessons={lessonsData?.data || []}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      {/* Create/Edit Modal */}
      <LessonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        isLoading={isFormLoading}
        initialData={editingLesson}
        moduleId={selectedModuleId}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteLessonConfirmModal
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={deleteLessonMutation.isPending}
        title="this lesson"
      />
    </div>
  );
};

export default ManageLessonsPage;
