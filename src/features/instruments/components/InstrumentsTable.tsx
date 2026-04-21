"use client";
import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Instrument } from "../type";
import Image from "next/image";
import {
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  Package,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface InstrumentsTableProps {
  data: Instrument[];
  onEdit: (instrument: Instrument) => void;
  onDelete: (instrument: Instrument) => void;
  onAdd: () => void;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    onPageChange: (page: number) => void;
  };
}

const columnHelper = createColumnHelper<Instrument>();
const coreRowModel = getCoreRowModel();
const paginationRowModel = getPaginationRowModel();

const InstrumentsTable: React.FC<InstrumentsTableProps> = ({
  data,
  onEdit,
  onDelete,
  onAdd,
  pagination,
}) => {
  "use no memo";

  const columns = useMemo(
    () => [
      columnHelper.accessor("instrumentImage", {
        header: "Image",
        cell: (info) => {
          const url = info.getValue()?.url;
          return (
            <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
              {url ? (
                <Image
                  src={url}
                  alt="Instrument"
                  fill
                  className="object-cover"
                />
              ) : (
                <Package className="w-6 h-6 text-gray-300" />
              )}
            </div>
          );
        },
      }),
      columnHelper.accessor("instrumentTitle", {
        header: "Title",
        cell: (info) => (
          <div className="flex flex-col min-w-[200px]">
            <span className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
              {info.getValue()}
            </span>
            <span className="text-xs text-gray-500 line-clamp-1 italic">
              {info.row.original.instrumentDescription}
            </span>
          </div>
        ),
      }),
      columnHelper.accessor("level", {
        header: "Level",
        cell: (info) => {
          const level = info.getValue();
          const colors = {
            beginner: "bg-emerald-50 text-emerald-700 border-emerald-100",
            intermediate: "bg-orange-50 text-orange-700 border-orange-100",
            advanced: "bg-rose-50 text-rose-700 border-rose-100",
          };
          return (
            <Badge
              variant="outline"
              className={`capitalize font-bold border ${colors[level]}`}
            >
              {level}
            </Badge>
          );
        },
      }),
      columnHelper.accessor("modules", {
        header: "Modules",
        cell: (info) => (
          <div className="flex items-center gap-2 text-gray-600 font-medium">
            <Layers className="w-4 h-4 text-orange-400" />
            <span>{info.getValue()?.length || 0} Modules</span>
          </div>
        ),
      }),
      columnHelper.accessor("isActive", {
        header: "Status",
        cell: (info) => (
          <Badge
            className={`font-bold uppercase tracking-wider text-[10px] ${
              info.getValue()
                ? "bg-green-500 text-white"
                : "bg-gray-400 text-white"
            }`}
          >
            {info.getValue() ? "Active" : "Inactive"}
          </Badge>
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
            Instruments
          </h2>
          <p className="text-sm text-gray-500 italic">
            Manage your musical catalog
          </p>
        </div>
        <Button
          onClick={onAdd}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-lg shadow-orange-600/20 px-6"
        >
          <Plus className="mr-2 h-4 w-4" /> Create Instrument
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
                      <Package className="w-12 h-12 stroke-[1.5]" />
                      <p className="font-bold text-lg">No instruments found</p>
                      <Button variant="outline" size="sm" onClick={onAdd}>
                        Add your first instrument
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
            instruments
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

export default InstrumentsTable;
