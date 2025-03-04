import { navbarDataTypes } from "@/types/global";
import { ChevronDown } from "lucide-react";

export const navbarLinks = (role: string): navbarDataTypes[] => {
  const links: navbarDataTypes[] = [];

  if (role === "retireProfessional") {
    links.push({
      id: 1,
      title: "Orders",
      link: "/orders",
    });
  } else {
    links.push({
      id: 1,
      title: "Payment",
      link: "/payment",
    });
    
  }

  links.push(
    {
      id: 2,
      title: "About",
      link: "/#about",
    },
    {
      id: 3,
      title: "Services",
      link: `${role === "client"
          ? "/project-list/retireProfessional"
          : "/project-list/client"
            
        }`,
      icon: ChevronDown,
    }
  );

  return links;
};
