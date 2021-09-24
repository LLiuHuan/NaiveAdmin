// header
export interface IheaderSetting {
  bgColor: string; // 背景颜色
  fixed: boolean; // 是否固定
  isReload: boolean; // 是否显示刷新
}

// 菜单
export interface ImenuSetting {
  minMenuWidth: number;
  menuWidth: number;
  fixed: boolean;
  mixMenu: boolean;
}

// 多标签
export interface ImultiTabsSetting {
  bgColor: string;
  fixed: boolean;
  show: boolean;
}
