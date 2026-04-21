"use client";
import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Quiz } from "../type";
import {
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  ClipboardList,
  Target,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuizzesTableProps {
  data: Quiz[];
  onEdit: (quiz: Quiz) => void;
  onDelete: (quiz: Quiz) => void;
  onAdd: () => void;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    onPageChange: (page: number) => void;
  };
}

const columnHelper = createColumnHelper<Quiz>();
const coreRowModel = getCoreRowModel();
const paginationRowModel = getPaginationRowModel();

const QuizzesTable: React.FC<QuizzesTableProps> = ({
  data,
  onEdit,
  onDelete,
  onAdd,
  pagination,
}) => {
  "use no memo";

  const columns = useMemo(
    () => [
      columnHelper.accessor("quizName", {
        header: "Quiz Name",
        cell: (info) => (
          <div className="flex flex-col min-w-[200px]">
            <span className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
              {info.getValue()}
            </span>
            <span className="text-xs text-gray-500 line-clamp-1 italic">
              {typeof info.row.original.instrumentId === "object" &&
              info.row.original.instrumentId !== null
                ? info.row.original.instrumentId.name
                : "No instrument"}
              {" > "}
              {typeof info.row.original.moduleId === "object" &&
              info.row.original.moduleId !== null
                ? info.row.original.moduleId.title
                : "No module"}
            </span>
          </div>
        ),
      }),
      columnHelper.accessor("passingPercentage", {
        header: "Passing %",
        cell: (info) => (
          <div className="flex items-center gap-2 text-gray-600 font-medium">
            <Target className="w-4 h-4 text-orange-400" />
            <span>{info.getValue()}%</span>
          </div>
        ),
      }),
      columnHelper.accessor("participatedStudents", {
        header: "Participation",
        cell: (info) => (
          <div className="flex items-center gap-2 text-gray-600 font-medium">
            <Users className="w-4 h-4 text-blue-400" />
            <span>{info.getValue() || 0} Students</span>
          </div>
        ),
      }),
      columnHelper.accessor("createdAt", {
        header: "Created At",
        cell: (info) => (
          <span className="text-sm text-gray-600">
            {new Date(info.getValue()).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: (info) => (
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-orange-600 hover:bg-orange-50 transition-all"
              onClick={() => onEdit(info.row.original)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
              onClick={() => onDelete(info.row.original)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ),
      }),
    ],
    [onEdit, onDelete],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: coreRowModel,
    getPaginationRowModel: paginationRowModel,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Quizzes
          </h2>
          <p className="text-sm text-gray-500 italic">
            Manage your assessment quizzes
          </p>
        </div>
        <Button
          onClick={onAdd}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-lg shadow-orange-600/20 px-6"
        >
          <Plus className="mr-2 h-4 w-4" /> Create Quiz
        </Button>
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
                      {header.isPlaceholder
                        ? null
                        : flexRender(
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
                      <ClipboardList className="w-12 h-12 stroke-[1.5]" />
                      <p className="font-bold text-lg">No quizzes found</p>
                      <Button variant="outline" size="sm" onClick={onAdd}>
                        Add your first quiz
                      </Button>
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
            quizzes
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

export default QuizzesTable;
