"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";

interface DeleteLessonConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  title?: string;
}

const DeleteLessonConfirmModal: React.FC<DeleteLessonConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  title,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] border-none shadow-2xl rounded-3xl overflow-hidden p-0">
        <div className="bg-linear-to-br from-rose-500 to-rose-600 p-8 text-white flex flex-col items-center text-center">
          <div className="bg-white/20 p-4 rounded-full mb-4 backdrop-blur-sm animate-pulse">
            <AlertCircle className="w-12 h-12 text-white" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-white mb-2">
              Are you sure?
            </DialogTitle>
            <DialogDescription className="text-rose-100 font-medium">
              You are about to delete{" "}
              <span className="font-bold underline">
                {title || "this lesson"}
              </span>
              . This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
        </div>

        <DialogFooter className="p-6 bg-white flex flex-row gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 font-bold text-gray-500 hover:bg-gray-100 h-12 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 bg-rose-600 hover:bg-rose-700 font-bold h-12 shadow-lg shadow-rose-200 rounded-xl"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteLessonConfirmModal;
