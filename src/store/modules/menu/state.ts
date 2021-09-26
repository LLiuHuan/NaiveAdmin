import { RouteRecordRaw } from "vue-router";
import { constantRouter } from "@/router";

export type State = {
  menus: RouteRecordRaw[];
  routers: any[];
  addRouters: any[];
  keepAliveComponents: string[];
  isDynamicAddedRoute: boolean;
};

export const state: State = {
  menus: [],
  routers: constantRouter,
  addRouters: [],
  keepAliveComponents: [],
  // Whether the route has been dynamically added
  isDynamicAddedRoute: false,
};
