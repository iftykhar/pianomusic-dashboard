"use client";
import React, { useState } from "react";
import MembersTable from "@/features/members/components/MembersTable";
import AddMemberModal from "@/features/members/components/AddMemberModal";
import { useMembers } from "@/features/members/hooks/useMembers";

const MembersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: response, isLoading } = useMembers();

  const members = response?.data || [];

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <MembersTable
        data={members}
        isLoading={isLoading}
        onAdd={() => setIsModalOpen(true)}
      />

      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MembersPage;
