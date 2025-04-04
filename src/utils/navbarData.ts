import { navbarDataTypes } from "@/types/global";
import { ChevronDown } from "lucide-react";

export const navbarLinks = (role: string): navbarDataTypes[] => {
  const links: navbarDataTypes[] = [];



  links.push(
    {
      id: 3,
      title: "Services",
      link: `${role === "client"
        ? "/project-list/retireProfessional"
        : "/project-list/client"

        }`,
      icon: ChevronDown,
    },
    {
      id: 2,
      title: "About",
      link: "/about-us",
    },
  );


  if (role === "retireProfessional") {
    links.push({
      id: 1,
      title: "Orders",
      link: "/orders",
    });
  } else {
    links.push(
      {
        id: 4,
        title: "Order",
        link: "/clientOrder",
      },
      {
        id: 5,
        title: "Payment",
        link: "/payment",
      },
    );

  }

  return links;
};
