import { State } from "./state";
import { GetterTree } from "vuex";
import { RootState } from "@/store";
import {
  ICrumbsSetting,
  IHeaderSetting,
  IMenuSetting,
  IMultiTabsSetting,
  IProjectSetting,
} from "/#/config";

export type Getters = {
  getDarkTheme(state: State): boolean;
  getAppTheme(state: State): string;
  getAppThemeList(state: State): string[];
  getHeaderSetting(state: State): IHeaderSetting;
  getProjectNavMode(state: State): string;
  getMenuSetting(state: State): IMenuSetting;
  getProjectNavTheme(state: State): string;
  getMultiTabsSetting(state: State): IMultiTabsSetting;
  getProjectSetting(state: State): IProjectSetting;
  getCrumbsSetting(state: State): ICrumbsSetting;
};

export const getters: GetterTree<State, RootState> & Getters = {
  getDarkTheme: (state) => state.darkTheme,
  getAppTheme: (state) => state.appTheme,
  getAppThemeList: (state) => state.appThemeList,
  getHeaderSetting: (state) => state.headerSetting,
  getProjectNavMode: (state) => state.projectSetting.navMode,
  getMenuSetting: (state) => state.menuSetting,
  getProjectNavTheme: (state) => state.projectSetting.navTheme,
  getMultiTabsSetting: (state) => state.multiTabsSetting,
  getProjectSetting: (state) => state.projectSetting,
  getCrumbsSetting: (state) => state.crumbsSetting,
};
