// header
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
