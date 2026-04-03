import { ReactNode } from "react";

export type RouteType = {
  element: ReactNode,
  state: string,
  index?: boolean,
  visible?:boolean,
  path?: string,
  child?: RouteType[],
  sidebarProps?: {
    displayText: string,
    icon?: ReactNode;
  };
};