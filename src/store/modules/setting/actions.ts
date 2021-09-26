import { ActionContext, ActionTree } from "vuex";
import { State } from "./state";
import { RootState } from "@/store";
import { Mutations, MutationType } from "./mutations";

export enum ActionsType {
  SetDarkTheme = "SET_DARK_THEME",
}

type ActionAugments = Omit<ActionContext<State, RootState>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionsType.SetDarkTheme](context: ActionAugments, payload: State): any;
};

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionsType.SetDarkTheme]({ commit }, payload) {
    commit(MutationType.SetDarkTheme, payload);
  },
};
