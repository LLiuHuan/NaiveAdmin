import { State } from "@/store/modules/menu/state";
import { MutationTree } from "vuex";
import { constantRouter } from "@/router";
import { RouteRecordRaw } from "vue-router";

export enum MutationType {
  SET_DYNAMIC_ADDED_ROUTE = "SET_DYNAMIC_ADDED_ROUTE",
  SET_ROUTERS = "SET_ROUTERS",
  SET_MENUS = "SET_MENUS",
  SET_KEEP_ALIVE_COMPONENTS = "SET_KEEP_ALIVE_COMPONENTS",
}

export type Mutations<S = State> = {
  [MutationType.SET_DYNAMIC_ADDED_ROUTE](state: S, payload: boolean): void;
  [MutationType.SET_ROUTERS](state: S, payload: any[]): void;
  [MutationType.SET_MENUS](state: S, payload: RouteRecordRaw[]): void;
  [MutationType.SET_KEEP_ALIVE_COMPONENTS](state: S, payload: string[]): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SET_DYNAMIC_ADDED_ROUTE]: (state, payload) => {
    state.isDynamicAddedRoute = payload;
  },
  [MutationType.SET_ROUTERS]: (state, payload) => {
    state.routers = constantRouter.concat(payload);
  },
  [MutationType.SET_MENUS]: (state, payload) => {
    state.menus = payload;
  },
  [MutationType.SET_KEEP_ALIVE_COMPONENTS]: (state, payload) => {
    state.keepAliveComponents = payload;
  },
};
