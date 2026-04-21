"use client";
import React, { useState } from "react";
import { useExercises } from "@/features/manage-exercise/hooks/useExercises";
import {
  useCreateExerciseMutation,
  useUpdateExerciseMutation,
  useDeleteExerciseMutation,
} from "@/features/manage-exercise/hooks/useExerciseMutations";
import { Exercise } from "@/features/manage-exercise/types";
import ExerciseList from "@/features/manage-exercise/components/ExerciseList";
import ExerciseModal from "@/features/manage-exercise/components/ExerciseModal";
import DeleteExerciseConfirmModal from "@/features/manage-exercise/components/DeleteExerciseConfirmModal";
import { ExerciseListSkeleton } from "@/features/manage-exercise/components/ExerciseListSkeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ManageExercisePage() {
  const { data: response, isLoading, isError } = useExercises();
  const exercises = response?.data || [];

  const createMutation = useCreateExerciseMutation();
  const updateMutation = useUpdateExerciseMutation();
  const deleteMutation = useDeleteExerciseMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState<string | null>(null);

  const handleCreate = () => {
    setSelectedExercise(null);
    setIsModalOpen(true);
  };

  const handleEdit = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setExerciseToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleModalSubmit = (formData: FormData) => {
    if (selectedExercise) {
      updateMutation.mutate(
        { id: selectedExercise._id, data: formData },
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

  const handleDeleteConfirm = () => {
    if (exerciseToDelete) {
      deleteMutation.mutate(exerciseToDelete, {
        onSuccess: () => setIsDeleteModalOpen(false),
      });
    }
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center p-10 text-red-500">
        Failed to load exercises. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Manage Exercises
          </h1>
          <p className="text-gray-500 mt-1">
            Create and manage exercises for the students.
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/20 font-semibold"
        >
          <Plus className="w-5 h-5 mr-2" /> Add New Exercise
        </Button>
      </div>

      {isLoading ? (
        <ExerciseListSkeleton />
      ) : (
        <ExerciseList
          exercises={exercises}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      <ExerciseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
        initialData={selectedExercise}
      />

      <DeleteExerciseConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteMutation.isPending}
        title={exercises.find((e) => e._id === exerciseToDelete)?.title}
      />
    </div>
  );
}
