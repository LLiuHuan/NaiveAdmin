import { State } from "@/store/modules/user/state";
import { MutationTree } from "vuex";

export enum MutationType {
  SET_TOKEN = "SET_TOKEN",
  SET_AVATAR = "SET_AVATAR",
  SET_PERMISSIONS = "SET_PERMISSIONS",
  SET_USER_INFO = "SET_USER_INFO",
  SET_ROLES = "SET_ROLES",
}

export type Mutations<S = State> = {
  [MutationType.SET_TOKEN](state: S, payload: string): void;
  [MutationType.SET_AVATAR](state: S, payload: string): void;
  [MutationType.SET_PERMISSIONS](state: S, payload: [any][]): void;
  [MutationType.SET_USER_INFO](state: S, payload: any): void;
  [MutationType.SET_ROLES](state: S, payload: any): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SET_TOKEN]: (state, payload) => {
    state.token = payload;
  },
  [MutationType.SET_AVATAR]: (state, payload) => {
    state.avatar = payload;
  },
  [MutationType.SET_PERMISSIONS]: (state, payload) => {
    state.permissions = payload;
  },
  [MutationType.SET_USER_INFO]: (state, payload) => {
    state.info = payload;
  },
  [MutationType.SET_ROLES]: (state, payload) => {
    state.info = payload;
  },
};
