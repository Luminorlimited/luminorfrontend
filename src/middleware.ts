import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode"; // Ensure proper import for jwtDecode

export function middleware(request: NextRequest) {
  const loginRoute = new URL("/user/auth/login", request.url); // Define the login route
  const AdminloginRoute = new URL("/admin/login", request.url); // Define the login route
  const pathname = request.nextUrl.pathname;

  // Get token from cookies
  const token = request.cookies.get("token")?.value;

  // Define routes where authentication rules apply
  const restrictedForAuthenticated = [
    "/user/auth/login",
    "/usertype",
    "/user/auth/professional",
    "/user/auth/client",
  ];

  const clientRoutes = [
    "/project-list/retireProfessional",
    "/user/editProfile/client",
    "/user/editProfile/client/:params*",
    "/orders",
    "/payment-details",
  ];
  const adminRoutes = [
    "/dashboard",
    "/dashboard/:params*",
    "/dashboard/offers",
    "/dashboard/orders",
    "/dashboard/profile",
    "/dashboard/users",
    "/dashboard/users/:params*",
  ];

  const professionalRoutes = [
    "/project-list/client",
    "/user/editProfile/retireProfessional",
    "/user/editProfile/retireProfessional/:params*",
    "/deliver-details",
    // "/deliver-details/:params*",
  ];

  // If no token, allow access to public authentication pages
  if (!token) {
    if (adminRoutes.includes(pathname)) {
      return NextResponse.redirect(AdminloginRoute);
    }
    if (clientRoutes.includes(pathname) || professionalRoutes.includes(pathname)) {
      return NextResponse.redirect(loginRoute);
    }
    return NextResponse.next();
  }

  try {
    // Decode token to extract user role
    const userInfo = jwtDecode<{ role?: string }>(token);

    const role = userInfo?.role;

    if (!role) {
      return NextResponse.redirect(loginRoute);
    }

    // Prevent authenticated users from accessing authentication pages
    if (restrictedForAuthenticated.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Role-based route handling
    if (clientRoutes.includes(pathname) && role !== "client") {
      return NextResponse.redirect(loginRoute);
    }

    if (adminRoutes.includes(pathname) && role !== "admin") {
      return NextResponse.redirect(AdminloginRoute);
    }

    if (professionalRoutes.includes(pathname) && role !== "retireProfessional") {
      return NextResponse.redirect(loginRoute);
    }

    return NextResponse.next(); // Allow access if role matches
  } catch (e) {
    console.error("Token decoding failed:", e);
    return NextResponse.redirect(loginRoute);
  }
}

export const config = {
  matcher: [
    "/profile",
    "/project-list/client",
    "/project-list/:params*",
    "/project-list/professional",
    "/user/editProfile/client",
    "/user/editProfile/retireProfessional",
    "/user/editProfile/retireProfessional/:params*",
    "/project-list/default",
    "/dashboard",
    "/dashboard/:params*",
    "/chat",
    "/chat/:params*",
    "/payment-details",
    "/deliver-details",
    // "/deliver-details/:params*",
  ],
};