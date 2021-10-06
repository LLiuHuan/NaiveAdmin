// header
import { RouteLocationNormalized } from "vue-router";

export interface IHeaderSetting {
  bgColor: string; // 背景颜色
  fixed: boolean; // 是否固定
  isReload: boolean; // 是否显示刷新
}

// 菜单
export interface IMenuSetting {
  minMenuWidth: number;
  menuWidth: number;
  fixed: boolean;
  mixMenu: boolean;
}

// 多标签
export interface IMultiTabsSetting {
  bgColor: string;
  fixed: boolean;
  show: boolean;
}

// 项目
export interface IProjectSetting {
  //导航模式
  navMode: string;
  //导航风格
  navTheme: string;
  //页脚
  showFooter: boolean;
  //权限模式
  permissionMode: string;
  //是否开启路由动画
  isPageAnimate: boolean;
  //路由动画类型
  pageAnimateType: string;
}

// 面包屑
export interface ICrumbsSetting {
  show: boolean;
  showIcon: boolean;
}

// Tabs
export type RouteItem = Partial<RouteLocationNormalized> & {
  fullPath: string;
  name: string;
};

export interface GlobConfig {
  title: string;
  apiUrl: string;
  shortName: string;
  urlPrefix?: string;
  uploadUrl?: string;
  prodMock: boolean;
  imgUrl?: string;
}

export interface GlobEnvConfig {
  // 标题
  VITE_GLOB_APP_TITLE: string;
  // 接口地址
  VITE_GLOB_API_URL: string;
  // 接口前缀
  VITE_GLOB_API_URL_PREFIX?: string;
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string;
  // 图片上传地址
  VITE_GLOB_UPLOAD_URL?: string;
  //图片前缀地址
  VITE_GLOB_IMG_URL?: string;
  //生产环境开启mock
  VITE_GLOB_PROD_MOCK: boolean;
}
