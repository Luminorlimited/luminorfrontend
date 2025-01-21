import { navbarDataTypes } from "@/types/global";
import { ChevronDown } from "lucide-react";
import jwt, { JwtPayload } from "jsonwebtoken";
// import { RootState } from "@/redux/store";
import { store } from "@/redux/store";

interface DecodedToken extends JwtPayload {
  id: string;
  role?: string;
}

const token = store.getState().Auth.token;

const decodedToken: DecodedToken | null = token
  ? (jwt.decode(token) as DecodedToken)
  : null;

export const navbarLinks: navbarDataTypes[] = [
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
    link: `/project-list/${decodedToken?.role || "default"}`, // Fallback to "default" if role is undefined
    icon: ChevronDown,
  },
];
