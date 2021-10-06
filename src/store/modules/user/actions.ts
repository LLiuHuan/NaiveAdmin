import { ActionContext, ActionTree } from "vuex";
import { RootState } from "@/store";
import {
  ACCESS_TOKEN,
  CURRENT_USER,
  IS_LOCKSCREEN,
  State,
} from "@/store/modules/user/state";
import { Mutations, MutationType } from "@/store/modules/user/mutations";
import { login } from "@/api/system/user";
import { ResultEnum } from "@/enums/httpEnum";
import { storage } from "@/utils/Storage";

export enum ActionsType {
  LOGIN = "LOGIN",
}

type ActionAugments = Omit<ActionContext<State, RootState>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionsType.LOGIN](context: ActionAugments, payload: State): any;
};

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionsType.LOGIN]({ commit }, payload) {
    try {
      const response = await login(payload);
      if (response) {
        const { data, code } = response;
        if (code === ResultEnum.SUCCESS) {
          const ex = 7 * 24 * 60 * 60 * 1000;
          storage.set(ACCESS_TOKEN, data.token, ex);
          storage.set(CURRENT_USER, data.user, ex);
          storage.set(IS_LOCKSCREEN, false);
          commit(MutationType.SET_TOKEN, data.token);
          commit(MutationType.SET_USER_INFO, data);

          if (data.Permissions.length === 0) {
            commit(MutationType.SET_ROLES, ["ROLE_SYSTEM_DEFAULT"]);
          } else {
            commit(MutationType.SET_ROLES, data.Permissions);
          }
        }
        console.log(response);
        return Promise.resolve(response);
      } else {
        return Promise.reject();
      }
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
