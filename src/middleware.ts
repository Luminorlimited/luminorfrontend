import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode"; // Ensure proper import for jwtDecode

export function middleware(request: NextRequest) {
    const homeRoute = request.nextUrl.origin
        ? `${request.nextUrl.origin}/not-found`
        : "/not-found";

    // Get token from cookies
    const token = request.cookies.get("token")?.value;
    if (!token) {
        // Redirect to home if no token is present
        return NextResponse.redirect(new URL(homeRoute, request.url));
    }

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

    const currentPath = request.nextUrl.pathname;
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
    matcher: ["/manage-courses", "/create-a-course", "/profile"], // Apply middleware to admin-specific routes
};
