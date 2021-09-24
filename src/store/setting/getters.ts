import { State } from "./state";
import { GetterTree } from "vuex";
import { RootState } from "@/store";
import { IheaderSetting, ImenuSetting, ImultiTabsSetting } from "/#/config";

export type Getters = {
  getDarkTheme(state: State): boolean;
  getAppTheme(state: State): string;
  getAppThemeList(state: State): string[];
  getHeaderSetting(state: State): IheaderSetting;
  getNavMode(state: State): string;
  getMenuSetting(state: State): ImenuSetting;
  getNavTheme(state: State): string;
  getMultiTabsSetting(state: State): ImultiTabsSetting;
};

export const getters: GetterTree<State, RootState> & Getters = {
  getDarkTheme: (state) => state.darkTheme,
  getAppTheme: (state) => state.appTheme,
  getAppThemeList: (state) => state.appThemeList,
  getHeaderSetting: (state) => state.headerSetting,
  getNavMode: (state) => state.navMode,
  getMenuSetting: (state) => state.menuSetting,
  getNavTheme: (state) => state.navTheme,
  getMultiTabsSetting: (state) => state.multiTabsSetting,
};
