// src/ap/Providers/providers.tsx

"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import TokenSync from "./TokenSync";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <TokenSync />
      {children}
    </SessionProvider>
  );
}
