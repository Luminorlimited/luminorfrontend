import { navbarDataTypes } from "@/types/global";
import { ChevronDown } from "lucide-react";

export const navbarLinks: navbarDataTypes[] = [
  {
    id: 1,
    title: "Home",
    link: "/",
  },
  {
    id: 2,
    title: "About",
    link: "/about",
  },
  {
    id: 3,
    title: "Services",
    link: "#",
    icon: ChevronDown,
    subMenus: [
      {
        id: 31,
        title: "Service 1",
        link: "/services/service1",
      },
      {
        id: 32,
        title: "Service 2",
        link: "/services/service2",
      },
      {
        id: 33,
        title: "Service 3",
        link: "/services/service3",
      },
    ],
  },
];
