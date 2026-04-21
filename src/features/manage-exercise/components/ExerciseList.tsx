"use client";
import React from "react";
import { Exercise } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, MoreVertical, Clock, Dumbbell } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface ExerciseListProps {
  exercises: Exercise[];
  onEdit: (exercise: Exercise) => void;
  onDelete: (id: string) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  onEdit,
  onDelete,
}) => {
  if (exercises.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <p className="text-gray-500">No exercises found.</p>
        <p className="text-sm text-gray-400 mt-1">
          Click the &quot;Add New Exercise&quot; button to create one.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exercises.map((exercise) => (
        <Card
          key={exercise._id}
          className="group hover:shadow-md transition-shadow duration-200 border-gray-200 overflow-hidden flex flex-col h-full"
        >
          <div className="relative h-40 bg-gray-100">
            {exercise.images?.url ? (
              // Use Link to wrap the image area for navigation
              <Link
                href={`/dashboard/manage-exercise/${exercise._id}`}
                className="absolute inset-0 cursor-pointer"
              >
                <Image
                  src={exercise.images.url}
                  alt={exercise.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            ) : (
              <Link
                href={`/dashboard/manage-exercise/${exercise._id}`}
                className="absolute inset-0 cursor-pointer"
              >
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 transition-colors duration-300 group-hover:bg-gray-200">
                  <Dumbbell className="w-12 h-12 opacity-20" />
                </div>
              </Link>
            )}

            <div className="absolute top-2 right-2 z-10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full"
                  >
                    <MoreVertical className="h-4 w-4 text-gray-700" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(exercise)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDelete(exercise._id)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="absolute top-2 left-2 z-10 pointer-events-none">
              {exercise.isActive ? (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700 backdrop-blur-sm shadow-xs border-green-200"
                >
                  Active
                </Badge>
              ) : (
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-700 backdrop-blur-sm shadow-xs border-gray-200"
                >
                  Inactive
                </Badge>
              )}
            </div>
          </div>

          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Link
                href={`/dashboard/manage-exercise/${exercise._id}`}
                className="hover:underline"
              >
                <CardTitle
                  className="text-lg font-semibold line-clamp-1"
                  title={exercise.title}
                >
                  {exercise.title}
                </CardTitle>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <Link
              href={`/dashboard/manage-exercise/${exercise._id}`}
              className="flex-1"
            >
              <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                {exercise.description}
              </p>
            </Link>
            <div className="flex items-center text-xs text-gray-400 gap-4 mt-auto pt-4 border-t border-gray-100">
              {exercise.createdAt && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />{" "}
                  {new Date(exercise.createdAt).toLocaleDateString()}
                </span>
              )}
              <span className="ml-auto flex items-center gap-1 text-orange-500 font-medium">
                {exercise.ExerciseContent?.length || 0} Content Items
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExerciseList;
