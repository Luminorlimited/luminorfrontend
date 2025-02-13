import { navbarDataTypes } from "@/types/global";
import { ChevronDown } from "lucide-react";


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
      link: `${
        role === "client" ? `/project-list/retireProfessional` : role === "retireProfessional" ? `/project-list/client` : "/user/auth/login"
      }`,
      icon: ChevronDown,
    },
  ];
};
