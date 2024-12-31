import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {jwtDecode} from "jwt-decode"; // Ensure proper import for jwtDecode

export function middleware(request: NextRequest) {
    const loginRoute = `${request.nextUrl.origin}/login`; // Define the login route

    // Get the token from cookies
    const token = request.cookies.get("token")?.value;

    if (!token) {
        // If no token is present, redirect to the login page
        return NextResponse.redirect(new URL(loginRoute, request.url));
    }

    try {
        // Decode the token
        const userInfo = jwtDecode<{ role?: string }>(token);

        // If token is valid, allow the request to proceed
        if (userInfo) {
            return NextResponse.next();
        }
    } catch (e) {
        console.error("Token decoding failed:", e); // Log the error for debugging

        // If decoding fails, redirect to the login page
        return NextResponse.redirect(new URL(loginRoute, request.url));
    }

    // Fallback (not strictly necessary here but added for safety)
    return NextResponse.redirect(new URL(loginRoute, request.url));
}

export const config = {
    matcher: ["/profile"], // Apply the middleware to the /profile route
};
