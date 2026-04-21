
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";


// export async function middleware(req: NextRequest) {
//     const token = await getToken({
//         req,
//         secret: process.env.NEXTAUTH_SECRET,
//     });

//     const { pathname } = req.nextUrl;

//     // Define public routes that don't require authentication
//     const publicRoutes = new Set([
//         "/login",
//         "/register",
//         "/verify-otp",
//         "/reset-password",
//         "/newpassword",
//         "/create-your-account",
//         "/change-password",
//         "/create-new-password",
//     ]);

//     // 1. Redirect guests (no token) to login if they try to access ANY non-public route
//     if (!token) {
//         if (!publicRoutes.has(pathname)) {
//             return NextResponse.redirect(new URL("/login", req.url));
//         }
//         return NextResponse.next();
//     }

//     // 2. Authenticated user (token exists) logic:
//     const userRole = (token.role as string);

//     // For admins, any public route or the root should go to /dashboard
//     if (pathname === "/" || publicRoutes.has(pathname)) {
//         if (userRole === "admin") {
//             return NextResponse.redirect(new URL("/dashboard", req.url));
//         }
//         // If they have a token but aren't ADMIN, maybe they shouldn't be here at all?
//         // But let's avoid redirecting them to /dashboard if they aren't authorized for it.
//     }

//     // Role check for dashboard routes
//     if (pathname.startsWith("/dashboard")) {
//         if (userRole !== "admin") {
//             // If they aren't ADMIN, sign them out or send to login with an error
//             // To be safe and avoid loops, let's just send to login.
//             return NextResponse.redirect(new URL("/login?error=Unauthorized", req.url));
//         }
//         return NextResponse.next();
//     }

//     // Fallback for any other path (like /abc) for authenticated users - redirect to dashboard if ADMIN
//     if (userRole === "admin") {
//         return NextResponse.redirect(new URL("/dashboard", req.url));
//     }

//     return NextResponse.next();
// }


// export const config = {
//     matcher: [
//         /*
//          * Match all request paths except for the ones starting with:
//          * - api (API routes)
//          * - _next/static (static files)
//          * - _next/image (image optimization files)
//          * - favicon.ico (favicon file)
//          * - images, music, no-image.jpg (public assets)
//          */
//         "/((?!api|_next/static|_next/image|favicon.ico|images|music|no-image.jpg).*)",
//         "/"
//     ],
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const pathname = req.nextUrl.pathname;

  //  Root route "/"
  if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  //  Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    // Not logged in
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Role check
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};