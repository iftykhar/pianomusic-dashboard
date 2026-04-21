"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

/**
 * TokenSync component handles synchronizing the next-auth session token
 * to localStorage for use by the Axios API client.
 */
export default function TokenSync() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      if (localStorage.getItem("token") !== session.accessToken) {
        localStorage.setItem("token", session.accessToken);
        console.log("Token synced to localStorage");
      }
    } else if (session === null) {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        console.log("Token removed from localStorage");
      }
    }
  }, [session]);

  return null;
}
