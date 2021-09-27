import designSetting from "@/settings/designSetting";
import {
  ICrumbsSetting,
  IHeaderSetting,
  IMenuSetting,
  IMultiTabsSetting,
  IProjectSetting,
} from "/#/config";
import projectSetting from "@/settings/projectSetting";

const { darkTheme, appTheme, appThemeList } = designSetting;
const {
  headerSetting,
  menuSetting,
  multiTabsSetting,
  baseSetting,
  crumbsSetting,
} = projectSetting;

export type State = {
  //深色主题
  darkTheme: boolean;
  //系统风格
  appTheme: string;
  //系统内置风格
  appThemeList: string[];

  //顶部设置
  headerSetting: IHeaderSetting;
  //菜单
  menuSetting: IMenuSetting;
  //多标签
  multiTabsSetting: IMultiTabsSetting;
  //系统
  projectSetting: IProjectSetting;
  //面包屑
  crumbsSetting: ICrumbsSetting; //面包屑
};

export const state: State = {
  darkTheme: darkTheme,
  appTheme: appTheme,
  appThemeList: appThemeList,

  headerSetting: headerSetting,
  menuSetting: menuSetting,
  multiTabsSetting: multiTabsSetting,
  projectSetting: baseSetting,
  crumbsSetting: crumbsSetting,
};
