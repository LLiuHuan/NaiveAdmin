import { RouteRecordRaw } from "vue-router";
import { GetterTree } from "vuex";
import { RootState } from "@/store";
import { State } from "./state";

export type Getters = {
  getMenus(state: State): RouteRecordRaw[];
  getIsDynamicAddedRoute(state: State): boolean;
};

export const getters: GetterTree<State, RootState> & Getters = {
  getMenus: (state) => state.menus,
  getIsDynamicAddedRoute: (state) => state.isDynamicAddedRoute,
};
