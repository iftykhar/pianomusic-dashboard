"use client";
import React, { useState } from "react";
import { useQuizzes, useSingleQuiz } from "@/features/quizzes/hooks/useQuizzes";
import { useQuizMutations } from "@/features/quizzes/hooks/useQuizMutations";
import QuizzesTable from "@/features/quizzes/components/QuizzesTable";
import QuizzesTableSkeleton from "@/features/quizzes/components/QuizzesTableSkeleton";
import QuizModal from "@/features/quizzes/components/QuizModal";
import DeleteQuizConfirm from "@/features/quizzes/components/DeleteQuizConfirm";
import { Quiz } from "@/features/quizzes/type";

const QuizManagementPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useQuizzes(page, limit);
  const { createQuizMutation, updateQuizMutation, deleteQuizMutation } =
    useQuizMutations();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);

  const { data: fullQuizData, isLoading: isFetchingQuiz } = useSingleQuiz(
    editingQuizId || "",
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<Quiz | null>(null);

  const handleEdit = (quiz: Quiz) => {
    setEditingQuizId(quiz._id);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingQuizId(null);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (quiz: Quiz) => {
    setQuizToDelete(quiz);
    setIsDeleteModalOpen(true);
  };

  const handleModalSubmit = async (quizData: Partial<Quiz>) => {
    if (editingQuizId) {
      updateQuizMutation.mutate(
        { id: editingQuizId, data: quizData },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setEditingQuizId(null);
          },
        },
      );
    } else {
      createQuizMutation.mutate(quizData, {
        onSuccess: () => setIsModalOpen(false),
      });
    }
  };

  const handleConfirmDelete = () => {
    if (quizToDelete) {
      deleteQuizMutation.mutate(quizToDelete._id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setQuizToDelete(null);
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
          Error loading quizzes
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          We encountered an issue while fetching the quizzes. Please check your
          connection and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {isLoading ? (
        <QuizzesTableSkeleton />
      ) : (
        <QuizzesTable
          data={data?.data?.data || []}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onAdd={handleAdd}
          pagination={{
            currentPage: data?.data?.meta?.page || 1,
            totalPages: data?.data?.meta?.totalPages || 1,
            totalItems: data?.data?.meta?.total || 0,
            onPageChange: (p) => setPage(p),
          }}
        />
      )}

      {/* Create/Update Modal */}
      <QuizModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingQuizId(null);
        }}
        onSubmit={handleModalSubmit}
        isLoading={
          createQuizMutation.isPending ||
          updateQuizMutation.isPending ||
          isFetchingQuiz
        }
        initialData={editingQuizId ? fullQuizData?.data : null}
      />

      {/* Delete Confirmation Modal */}
      <DeleteQuizConfirm
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={deleteQuizMutation.isPending}
        quizName={quizToDelete?.quizName || ""}
      />
    </div>
  );
};

export default QuizManagementPage;
