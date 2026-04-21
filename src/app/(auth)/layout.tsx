import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Welcome!",
  description:
    "Manage your orders, track shipments, and configure products easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen bg-[url('/images/loginpiano.jpg')] bg-cover bg-center flex items-center justify-center">
      <div className="w-full max-w-3xl">
        {children}
      </div>
    </div>
  );
}
