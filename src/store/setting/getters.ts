import {State} from "./state";
import {GetterTree} from "vuex";
import {RootState} from "../index";

export type Getters = {
  darkTheme(state: State): boolean;
}

export const getters: GetterTree<State, RootState> & Getters = {
  darkTheme: (state) => state.darkTheme,
};
