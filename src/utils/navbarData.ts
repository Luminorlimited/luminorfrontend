import { navbarDataTypes } from "@/types/global";
import { ChevronDown } from "lucide-react";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { RootState } from "@/redux/store";
// import { store } from "@/redux/store";

// interface DecodedToken extends JwtPayload {
//   id: string;
//   role?: string;
// }

// const role = store.getState().Auth?.user?.role;

// const decodedToken: DecodedToken | null = token
//   ? (jwt.decode(token) as DecodedToken)
//   : null;

export const navbarLinks = (role: string): navbarDataTypes[] => {
  return [
    {
      id: 1,
      title: "Orders",
      link: "/orders",
    },
    {
      id: 2,
      title: "About",
      link: "#about",
    },
    {
      id: 3,
      title: "Services",
      link: `${role ? "/project-list/" + role : "/user/auth/login"}`, // Fallback to "default" if role is undefined
      icon: ChevronDown,
    },
  ];
};
