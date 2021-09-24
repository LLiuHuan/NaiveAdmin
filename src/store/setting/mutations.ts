import { State } from "./state";
import { MutationTree } from "vuex";

export enum MutationType {
  SetDarkTheme = "SET_DARK_THEME",
}

export type Mutations<S = State> = {
  [MutationType.SetDarkTheme](state: S, payload: State): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetDarkTheme]: (state, payload) => {
    state.darkTheme = payload.darkTheme;
  },
};
