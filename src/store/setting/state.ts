import designSetting from "@/settings/designSetting";
import { IheaderSetting, ImenuSetting, ImultiTabsSetting } from "/#/config";
import projectSetting from "@/settings/projectSetting";

const { darkTheme, appTheme, appThemeList } = designSetting;
const { headerSetting, navMode, menuSetting, navTheme, multiTabsSetting } =
  projectSetting;

export type State = {
  //深色主题
  darkTheme: boolean;
  //系统风格
  appTheme: string;
  //系统内置风格
  appThemeList: string[];

  //顶部设置
  headerSetting: IheaderSetting;
  //导航模式
  navMode: string;
  //菜单
  menuSetting: ImenuSetting;
  //多标签
  multiTabsSetting: ImultiTabsSetting;
  //导航风格
  navTheme: string;
};

export const state: State = {
  darkTheme: darkTheme,
  appTheme: appTheme,
  appThemeList: appThemeList,
  headerSetting: headerSetting,
  navMode: navMode,
  menuSetting: menuSetting,
  navTheme: navTheme,
  multiTabsSetting: multiTabsSetting,
};
