import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode"; // Ensure proper import for jwtDecode

export function middleware(request: NextRequest) {
    const homeRoute = request.nextUrl.origin
        ? `${request.nextUrl.origin}/`
        : "/not-found";

    // Get token from cookies
    const token = request.cookies.get("token")?.value;

    const currentPath = request.nextUrl.pathname;

    // Restrict access to '/user/auth/login' and '/user/auth/professional' if a token exists
    if (token && ["/user/auth/login", "/user/auth/professional", '/project-details', '/deliver-details', "/deliver-details/addreview"].includes(currentPath)) {
        // Redirect authenticated users to a default page (e.g., home)
        return NextResponse.redirect(new URL("/", request.url)); // Redirect to homepage
    }

    // Restrict access to '/user/editProfile/client/:id' if no token exists
    const isEditProfileClientPath = currentPath.startsWith("/user/editProfile/client/");
    if (!token && isEditProfileClientPath) {
        return NextResponse.redirect(new URL(homeRoute, request.url)); // Redirect to not-found or home if no token
    }

    // Restrict access to '/chat' if no token exists
    // if (!token && currentPath === "/chat") {
    //     return NextResponse.redirect(new URL(homeRoute, request.url)); // Redirect to not-found or home if no token
    // }

    // Decode token to get user info
    let userInfo: { role?: string };
    try {
        userInfo = jwtDecode(token as string) as { role?: string };
    } catch (error) {
        if (error) {
            return NextResponse.redirect(new URL(homeRoute, request.url));
        }
        return;
    }

    const adminPaths = ["/manage-courses", "/create-a-course", "/profile"];

    // Restrict access to admin paths if user is not an ADMIN
    if (
        adminPaths.some((e) => currentPath.startsWith(e)) &&
        userInfo?.role !== "ADMIN"
    ) {
        return NextResponse.redirect(new URL(homeRoute, request.url));
    }

    // Allow the request to proceed
    return NextResponse.next();
}

export const config = {
    matcher: [
        // "/user/auth/login",
        "/user/auth/client",
        // "/user/auth/professional",
        "/project-details",
        "/deliver-details",
        "/deliver-details/addreview",
       
    ],
};
