import { State } from "@/store/modules/tabs/state";
import { GetterTree } from "vuex";
import { RootState } from "@/store";
import { RouteItem } from "/#/config";

export type Getters = {
  getTabsList(state: State): RouteItem[];
};

export const getters: GetterTree<State, RootState> & Getters = {
  getTabsList: (state) => state.tabsList,
};
