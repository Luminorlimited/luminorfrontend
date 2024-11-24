import { ElementType } from "react";

export type navbarDataTypes = {
  id: number;
  title: string;
  link: string;
  subMenus?: navbarDataTypes[];
  icon?: ElementType | undefined;
};
