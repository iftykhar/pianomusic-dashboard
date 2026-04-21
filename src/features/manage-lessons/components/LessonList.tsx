"use client";
import React from "react";
import { Lesson } from "../type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Trash2,
  MoreVertical,
  FileText,
  Clock,
  Music,
} from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LessonListProps {
  lessons: Lesson[];
  onEdit: (lesson: Lesson) => void;
  onDelete: (id: string) => void;
}

const LessonList: React.FC<LessonListProps> = ({
  lessons,
  onEdit,
  onDelete,
}) => {
  if (lessons.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <p className="text-gray-500">No lessons found for this module.</p>
        <p className="text-sm text-gray-400 mt-1">
          Click the &quot;Add New Lesson&quot; button to create one.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lessons
        .sort((a, b) => a.order - b.order)
        .map((lesson) => (
          <Card
            key={lesson._id}
            className="group hover:shadow-md transition-shadow duration-200 border-gray-200 overflow-hidden"
          >
            <div className="relative h-40 bg-gray-100">
              {lesson.media?.images?.[0]?.url ? (
                <Image
                  src={lesson.media.images[0].url}
                  alt={lesson.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                  <FileText className="w-12 h-12 opacity-20" />
                </div>
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
                    <DropdownMenuItem onClick={() => onEdit(lesson)}>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(lesson._id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="absolute top-2 left-2 z-10">
                <Badge
                  variant="secondary"
                  className="bg-white/90 backdrop-blur-sm text-gray-700 shadow-xs"
                >
                  Order: {lesson.order}
                </Badge>
              </div>
              {lesson.media?.audio && (
                <div className="absolute bottom-2 right-2 p-1.5 bg-black/50 rounded-full text-white backdrop-blur-sm z-10">
                  <Music className="w-4 h-4" />
                </div>
              )}
            </div>

            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle
                  className="text-lg font-semibold line-clamp-1"
                  title={lesson.title}
                >
                  {lesson.title}
                </CardTitle>
                {lesson.isExercise && (
                  <Badge
                    variant="default"
                    className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200"
                  >
                    Exercise
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px] mb-4">
                {lesson.content}
              </p>
              <div className="flex items-center text-xs text-gray-400 gap-4 mt-auto pt-4 border-t border-gray-100">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />{" "}
                  {new Date(lesson.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default LessonList;
