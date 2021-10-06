import { createStorage } from "@/utils/Storage";

const Storage = createStorage({ storage: localStorage });
export const ACCESS_TOKEN = "ACCESS-TOKEN"; // 用户token
export const CURRENT_USER = "CURRENT-USER"; // 当前用户信息
export const IS_LOCKSCREEN = "IS-LOCKSCREEN"; // 是否锁屏

export type State = {
  token: string;
  username: string;
  welcome: string;
  avatar: string;
  permissions: any[];
  info: any;
  roles: [];
};

export const state: State = {
  token: Storage.get(ACCESS_TOKEN, ""),
  username: "",
  welcome: "",
  avatar: "",
  permissions: [],
  info: Storage.get(CURRENT_USER, {}),
  roles: [],
};
