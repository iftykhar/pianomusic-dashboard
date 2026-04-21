import type { Metadata } from "next";
import Sidebar from "@/components/dashboard/common/Sidebar";
import DashboardHeader from "@/components/dashboard/common/Header";

export const metadata: Metadata = {
    title: "Dashboard Template.",
    description:
        "A modern dashboard template built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex">
            <Sidebar />

            <main className="flex-1 ml-64 p-6 overflow-auto min-h-screen">
            <DashboardHeader />
                {children}
            </main>
        </div>
    );
}