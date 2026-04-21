"use client";
import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Member } from "../type";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  User,
  Mail,
  Calendar,
  ShieldCheck,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface MembersTableProps {
  data: Member[];
  isLoading: boolean;
  onAdd: () => void;
}

const columnHelper = createColumnHelper<Member>();

const MembersTable: React.FC<MembersTableProps> = ({
  data,
  isLoading,
  onAdd,
}) => {
  "use no memo";
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Member",
        cell: (info) => {
          const member = info.row.original;
          return (
            <div className="flex items-center gap-3 min-w-[250px]">
              <div className="relative h-10 w-10 rounded-full overflow-hidden border border-gray-200 bg-gray-50 shrink-0">
                {member.avatar?.url ? (
                  <Image
                    src={member.avatar.url}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary">
                    <User className="h-5 w-5" />
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
                  {member.name}
                </span>
                <span className="text-xs text-gray-500 line-clamp-1">
                  @{member.username}
                </span>
              </div>
            </div>
          );
        },
      }),
      columnHelper.accessor("email", {
        header: "Email Address",
        cell: (info) => (
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{info.getValue()}</span>
          </div>
        ),
      }),
      columnHelper.accessor("role", {
        header: "Role",
        cell: (info) => {
          const role = info.getValue();
          const isAdmin = role === "admin";
          return (
            <Badge
              variant="outline"
              className={`capitalize font-bold border px-2 py-0.5 rounded-full text-[10px] ${
                isAdmin
                  ? "bg-purple-50 text-purple-700 border-purple-100"
                  : "bg-blue-50 text-blue-700 border-blue-100"
              }`}
            >
              <div className="flex items-center gap-1">
                {isAdmin && <ShieldCheck className="w-3 h-3" />}
                {role}
              </div>
            </Badge>
          );
        },
      }),
      columnHelper.accessor("createdAt", {
        header: "Joined Date",
        cell: (info) => (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(info.getValue()).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        ),
      }),
    ],
    [],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>
        <div className="border rounded-2xl overflow-hidden bg-white shadow-sm border-gray-100">
          <div className="p-4 border-b border-gray-50">
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="p-0">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 border-b border-gray-50 last:border-0"
              >
                <Skeleton className="h-12 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Members Management
          </h2>
          <p className="text-sm text-gray-500 italic">
            Overview of all registered users in the platform
          </p>
        </div>
        <Button
          onClick={onAdd}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 px-6 rounded-xl h-11 transition-all active:scale-95"
        >
          <Plus className="mr-2 h-5 w-5" /> Add New Member
        </Button>
      </div>

      <div className="w-full bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="p-4 border-b border-gray-50 bg-gray-50/30">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search members by name, email or username..."
              className="pl-10 h-11 border-gray-200 rounded-xl focus:ring-primary shadow-sm bg-white"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
        </div>

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
                    className="group hover:bg-primary/5 transition-colors"
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
                      <p className="font-bold text-lg">No members found</p>
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
            <span className="font-bold text-gray-900">
              {table.getRowModel().rows.length}
            </span>{" "}
            of <span className="font-bold text-gray-900">{data.length}</span>{" "}
            members
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 mr-4">
              <span className="text-sm text-gray-500 font-medium">Page</span>
              <span className="font-bold text-gray-900">
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </span>
            </div>

            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-gray-200 rounded-lg hover:border-primary hover:text-primary"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-gray-200 rounded-lg hover:border-primary hover:text-primary"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-gray-200 rounded-lg hover:border-primary hover:text-primary"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-gray-200 rounded-lg hover:border-primary hover:text-primary"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
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

export default MembersTable;
