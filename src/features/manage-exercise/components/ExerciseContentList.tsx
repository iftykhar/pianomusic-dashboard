"use client";
import React, { useState } from "react";
import { ExerciseContent } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Trash2,
  MoreVertical,
  Music,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExerciseContentListProps {
  contents: ExerciseContent[];
  onEdit: (content: ExerciseContent) => void;
  onDelete: (id: string) => void;
}

const ExerciseContentList: React.FC<ExerciseContentListProps> = ({
  contents,
  onEdit,
  onDelete,
}) => {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  if (contents.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <p className="text-gray-500">No content found for this exercise.</p>
        <p className="text-sm text-gray-400 mt-1">
          Click the &quot;Add Content&quot; button to create some.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contents.map((content) => (
        <Card
          key={content._id}
          className="group hover:shadow-md transition-shadow duration-200 border-gray-200 overflow-hidden"
        >
          <div className="relative h-48 bg-gray-100">
            {content.image?.url ? (
              <Image
                src={content.image.url}
                alt={content.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                <ImageIcon className="w-12 h-12 opacity-20" />
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
                  <DropdownMenuItem onClick={() => onEdit(content)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDelete(content._id)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {content.audio?.url && (
              <div className="absolute bottom-2 right-2 p-2 bg-black/50 rounded-full text-white backdrop-blur-sm z-10">
                <Music className="w-4 h-4" />
              </div>
            )}
          </div>

          <CardHeader className="pb-2">
            <CardTitle
              className="text-lg font-semibold line-clamp-1"
              title={content.title}
            >
              {content.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-[40px]">
              {content.description}
            </p>

            {content.keyNotes && content.keyNotes.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-1">
                {content.keyNotes.map((note, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-xs border-orange-200 bg-orange-50 text-orange-700"
                  >
                    {note}
                  </Badge>
                ))}
              </div>
            )}

            {content.audio?.url && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <audio
                  controls
                  className="w-full h-8"
                  src={content.audio?.url}
                  onPlay={() => {
                    if (playingAudio && playingAudio !== content._id) {
                      const audioElements =
                        document.getElementsByTagName("audio");
                      for (let i = 0; i < audioElements.length; i++) {
                        if (audioElements[i].src !== content.audio?.url) {
                          audioElements[i].pause();
                        }
                      }
                    }
                    setPlayingAudio(content._id);
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExerciseContentList;
