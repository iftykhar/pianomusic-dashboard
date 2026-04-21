"use client";
import React, { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { StudentReport } from "../type";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  User,
  BookOpen,
  CheckCircle2,
  Clock,
  Layout,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface StudentProgressTableProps {
  data: StudentReport[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    onPageChange: (page: number) => void;
  };
  onSearchChange: (value: string) => void;
  searchValue: string;
}

const columnHelper = createColumnHelper<StudentReport>();

const StudentProgressTable: React.FC<StudentProgressTableProps> = ({
  data,
  pagination,
  onSearchChange,
  searchValue,
}) => {
  "use no memo";
  const [localSearch, setLocalSearch] = useState(searchValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 500);
    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("student", {
        header: "Student",
        cell: (info) => {
          const student = info.getValue();
          return (
            <div className="flex items-center gap-3 min-w-[250px]">
              <div className="relative h-10 w-10 rounded-full overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">
                {student.avatar ? (
                  <Image
                    src={student.avatar}
                    alt={student.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary font-semibold text-sm">
                    {student.name
                      ? student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()
                      : <User className="h-5 w-5" />}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 line-clamp-1">
                  {student.name}
                </span>
                <span className="text-xs text-gray-500 line-clamp-1">
                  {student.email}
                </span>
              </div>
            </div>
          );
        },
      }),
      columnHelper.accessor("course", {
        header: "Course",
        cell: (info) => (
          <div className="flex items-center gap-2 text-gray-600 font-medium whitespace-nowrap">
            <BookOpen className="w-4 h-4 text-orange-400" />
            <span>{info.getValue()}</span>
          </div>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Current Progress",
        cell: (info) => {
          const status = info.getValue();
          return (
            <div className="flex flex-col gap-1 min-w-[200px]">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Layout className="w-3.5 h-3.5" />
                <span className="font-medium truncate">
                  {status.currentModule}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <FileText className="w-3.5 h-3.5" />
                <span className="truncate">{status.currentLesson}</span>
              </div>
            </div>
          );
        },
      }),
      columnHelper.accessor("metrics", {
        header: "Completion",
        cell: (info) => {
          const metrics = info.getValue();
          return (
            <div className="flex flex-col gap-1.5 min-w-[120px]">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
                <span>Lessons</span>
                <span className="text-gray-900">{metrics.lessonsDone}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
                <span>Modules</span>
                <span className="text-gray-900">{metrics.modulesDone}</span>
              </div>
            </div>
          );
        },
      }),
      columnHelper.accessor("status.isCompleted", {
        header: "Status",
        cell: (info) => (
          <Badge
            className={`font-bold uppercase tracking-wider text-[10px] ${info.getValue()
                ? "bg-emerald-500 text-white"
                : "bg-amber-500 text-white"
              }`}
          >
            {info.getValue() ? (
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Completed
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                In Progress
              </div>
            )}
          </Badge>
        ),
      }),
      columnHelper.accessor("lastActivity", {
        header: "Last Activity",
        cell: (info) => (
          <span className="text-sm text-gray-500 tabular-nums">
            {new Date(info.getValue()).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        ),
      }),
    ],
    [],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        {/*<div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Student Progress
          </h2>
          <p className="text-sm text-gray-500 italic">
            Monitor learning journey across all students
          </p>
        </div>
         <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search student or email..."
            className="pl-10 h-11 border-gray-200 rounded-xl focus:ring-primary shadow-sm"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div> */}
      </div>

      <div className="w-full bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-left px-6 py-4 text-[13px] font-black text-gray-500 uppercase tracking-widest"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="group hover:bg-orange-50/10 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-12 text-center"
                  >
                    <div className="flex flex-col items-center justify-center text-gray-400 gap-3">
                      <User className="w-12 h-12 stroke-[1.5]" />
                      <p className="font-bold text-lg">
                        No progress reports found
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/30">
          <div className="text-sm text-gray-500 font-medium">
            Showing{" "}
            <span className="font-bold text-gray-900">{data.length}</span> of{" "}
            <span className="font-bold text-gray-900">
              {pagination.totalItems}
            </span>{" "}
            reports
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 mr-4">
              <span className="text-sm text-gray-500 font-medium">Page</span>
              <span className="font-bold text-gray-900">
                {pagination.currentPage} of {pagination.totalPages}
              </span>
            </div>

            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-gray-200"
                onClick={() => pagination.onPageChange(1)}
                disabled={pagination.currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-gray-200"
                onClick={() =>
                  pagination.onPageChange(pagination.currentPage - 1)
                }
                disabled={pagination.currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-gray-200"
                onClick={() =>
                  pagination.onPageChange(pagination.currentPage + 1)
                }
                disabled={pagination.currentPage === pagination.totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-gray-200"
                onClick={() => pagination.onPageChange(pagination.totalPages)}
                disabled={pagination.currentPage === pagination.totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgressTable;
