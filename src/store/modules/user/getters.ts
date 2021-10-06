import { State } from "@/store/modules/user/state";
import { GetterTree } from "vuex";
import { RootState } from "@/store";

export type Getters = {
  getToken(state: State): string;
  getAvatar(state: State): string;
  getNickname(state: State): string;
  getPermissions(state: State): [any][];
  getUserInfo(state: State): object;
  getRoles(state: State): [];
};

export const getters: GetterTree<State, RootState> & Getters = {
  getToken: (state) => state.token,
  getAvatar: (state) => state.avatar,
  getNickname: (state) => state.username,
  getPermissions: (state) => state.permissions,
  getUserInfo: (state) => state.info,
  getRoles: (state) => state.roles,
};
