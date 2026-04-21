"use client";
import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useSingleExercise,
  useExerciseContents,
} from "@/features/manage-exercise/hooks/useExercises";
import {
  useCreateExerciseContentMutation,
  useUpdateExerciseContentMutation,
  useDeleteExerciseContentMutation,
} from "@/features/manage-exercise/hooks/useExerciseMutations";
import { ExerciseContent } from "@/features/manage-exercise/types";
import ExerciseContentList from "@/features/manage-exercise/components/ExerciseContentList";
import ExerciseContentModal from "@/features/manage-exercise/components/ExerciseContentModal";
import DeleteExerciseContentConfirmModal from "@/features/manage-exercise/components/DeleteExerciseContentConfirmModal";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExerciseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const {
    data: exerciseData,
    isLoading: isExerciseLoading,
    isError: isExerciseError,
  } = useSingleExercise(id);
  const { data: contentData, isLoading: isContentLoading } =
    useExerciseContents();

  const createMutation = useCreateExerciseContentMutation();
  const updateMutation = useUpdateExerciseContentMutation();
  const deleteMutation = useDeleteExerciseContentMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] =
    useState<ExerciseContent | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<string | null>(null);

  const filteredContents = useMemo(() => {
    if (!contentData?.data) return [];
    return contentData.data.filter((c) => c.exerciseId === id);
  }, [contentData, id]);

  const handleCreate = () => {
    setSelectedContent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (content: ExerciseContent) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (contentId: string) => {
    setContentToDelete(contentId);
    setIsDeleteModalOpen(true);
  };

  const handleModalSubmit = (formData: FormData) => {
    if (selectedContent) {
      updateMutation.mutate(
        { id: selectedContent._id, data: formData },
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
    if (contentToDelete) {
      deleteMutation.mutate(contentToDelete, {
        onSuccess: () => setIsDeleteModalOpen(false),
      });
    }
  };

  if (isExerciseLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-40 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-60" />
          <Skeleton className="h-60" />
          <Skeleton className="h-60" />
        </div>
      </div>
    );
  }

  if (isExerciseError || !exerciseData?.data) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center">
        <p className="text-red-500 mb-4">Failed to load exercise details.</p>
        <Button variant="outline" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  const exercise = exerciseData.data;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          className="w-fit pl-0 hover:bg-transparent hover:text-orange-600 transition-colors"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Exercises
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              {exercise.title}
            </h1>
            <p className="text-gray-500 mt-1 max-w-2xl">
              {exercise.description}
            </p>
          </div>
          <Button
            onClick={handleCreate}
            className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/20 font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" /> Add Content
          </Button>
        </div>
      </div>

      {/* Content List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          Exercise Content
          <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {filteredContents.length}
          </span>
        </h2>

        {isContentLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-60 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <ExerciseContentList
            contents={filteredContents}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        )}
      </div>

      <ExerciseContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
        initialData={selectedContent}
        exerciseId={id}
      />

      <DeleteExerciseContentConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteMutation.isPending}
        title={filteredContents.find((c) => c._id === contentToDelete)?.title}
      />
    </div>
  );
}
