import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {jwtDecode} from "jwt-decode"; // Ensure proper import for jwtDecode

export function middleware(request: NextRequest) {
    const loginRoute = `${request.nextUrl.origin}/user/auth/login`; // Define the login route

    // Get the token from cookies
    const token = request.cookies.get("token")?.value;

    const pathname = request.nextUrl.pathname;

    // Routes where authenticated users should not have access
    const restrictedForAuthenticated = [
        "/user/auth/login",
        "/usertype",
        "/user/auth/professional",
        "/user/auth/client",
    ];

    const clientRoutes = [
        "/project-list/client",
        "/user/editProfile/client",
    ];
    const professionalRoutes = [
        "/project-list/professional",
        "/user/editProfile/retireProfessional",
    ];

    if (token) {
        try {
            // Decode the token to extract user role and information
            const userInfo = jwtDecode<{ role?: string }>(token);

            if (userInfo?.role) {
                const role = userInfo.role;

                // Redirect authenticated users away from restricted routes
                if (restrictedForAuthenticated.includes(pathname)) {
                    return NextResponse.redirect(new URL("/", request.url)); // Redirect to homepage or another route
                }

                // Allow only clients to access client routes
                if (clientRoutes.includes(pathname)) {
                    if (role === "client") {
                        return NextResponse.next();
                    } else {
                        return NextResponse.redirect(new URL(loginRoute, request.url));
                    }
                }

                // Allow only professionals to access professional routes
                if (professionalRoutes.includes(pathname)) {
                    if (role === "retireProfessional") {
                        return NextResponse.next();
                    } else {
                        return NextResponse.redirect(new URL(loginRoute, request.url));
                    }
                }

                // Redirect to login for other unauthorized accesses
                return NextResponse.redirect(new URL(loginRoute, request.url));
            }
        } catch (e) {
            console.error("Token decoding failed:", e); // Log the error for debugging

            // If decoding fails, redirect to the login page
            return NextResponse.redirect(new URL(loginRoute, request.url));
        }
    }

    // If no token and trying to access restricted routes, allow them (login/auth routes)
    if (!token && restrictedForAuthenticated.includes(pathname)) {
        return NextResponse.next();
    }

    // Redirect unauthenticated users to login page for protected routes
    return NextResponse.redirect(new URL(loginRoute, request.url));
}

export const config = {
    matcher: [
        "/profile",
        "/project-list/client",
        "/project-list/professional",
        "/user/editProfile/client",
        "/user/editProfile/retireProfessional",
        // "/project-list/default",
        // "/chat",
        "/user/auth/login",
        "/usertype",
        "/user/auth/professional",
        "/user/auth/client",
    ], // Apply middleware to these routes
};
