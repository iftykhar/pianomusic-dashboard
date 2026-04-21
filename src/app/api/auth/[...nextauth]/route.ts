// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const baseUrl =
  process.env.NEXT_PUBLIC_API_URL;

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
    token: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
    accessToken: string;
    refreshToken: string;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const res = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();
          console.log("API Login Response:", JSON.stringify(data, null, 2));

          if (!res.ok) {
            throw new Error(data.message || "Login failed");
          }

          const userData = data.data;

          if (!userData?.accessToken) {
            throw new Error("Invalid response from server");
          }

          // Return the object that NextAuth will use as 'user' in the jwt callback
          return {
            id: userData.id || userData._id,
            email: userData.email,
            name: userData.email.split("@")[0], // Fallback name
            image: "",
            role: userData.role,
            // role: "admin", // Dashboard users are usually admins or staff
            token: userData.accessToken,
            refreshToken: userData.refreshToken,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          throw new Error(error instanceof Error ? error.message : "Invalid email or password");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        console.log("JWT callback - Initial Sign In - User:", user);
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.role = user.role;
        token.accessToken = user.token;
        token.refreshToken = user.refreshToken;
      }

      // Update session trigger
      if (trigger === "update" && session) {
        return { ...token, ...session.user };
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        console.log("Session callback - Token:", token);
        session.user = {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.image,
          role: token.role,
        };
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
