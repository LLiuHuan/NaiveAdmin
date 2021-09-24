import { createStore } from "vuex";
import {
  store as setting,
  SettingStore,
  State as SettingState,
} from "./setting";
import { App } from "vue";

// // 在开发环境中开启logger
// const debug = import.meta.env.DEV;
//
// const plugins = debug ? [createLogger({
//   filter(mutation, stateBefore, stateAfter) {
//     // 若 mutation 需要被记录，就让它返回 true 即可
//     // 顺便，`mutation` 是个 { type, payload } 对象
//     const notNeedDebugs: string[] = [LockscreenMutationType.SetLockTime, LockscreenMutationType.SetLock]
//     return !notNeedDebugs.includes(mutation.type)
//   }
// })] : [];

export type RootState = {
  setting: SettingState;
};

export type Store = SettingStore<Pick<RootState, "setting">>;

const store = createStore<RootState>({
  modules: {
    setting,
  },
});

export function useStore(): Store {
  return store as Store;
}

export function setupStore(app: App<Element>) {
  app.use(store);
  console.log(store, "vuex");
}

export default store;
