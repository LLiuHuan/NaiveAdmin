import type { RouteRecordRaw } from "vue-router";
import { Router } from "vue-router";
import { ErrorPageRoute } from "@/router/base";
import { asyncRoutes } from "@/router/index";
import { useStore } from "vuex";
import { PageEnum } from "@/enums/pageEnum";
import { storage } from "@/utils/Storage";
import { ACCESS_TOKEN } from "@/store/modules/user/state";
import { build } from "@/api/system/menu";

const LOGIN_PATH = PageEnum.BASE_LOGIN;
const whitePathList = [LOGIN_PATH]; // no redirect whitelist

export function createRouterGuards(router: Router) {
  const store = useStore();
  router.beforeEach(async (to, from, next) => {
    if (from.path === LOGIN_PATH && to.name === "errorPage") {
      next(PageEnum.BASE_HOME);
      return;
    }

    // Whitelist can be directly entered
    if (whitePathList.includes(to.path as PageEnum)) {
      next();
      return;
    }

    const token = storage.get(ACCESS_TOKEN);

    if (!token) {
      // You can access without permissions. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next();
        return;
      }
      // redirect login page
      const redirectData: {
        path: string;
        replace: boolean;
        query?: Recordable<string>;
      } = {
        path: LOGIN_PATH,
        replace: true,
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        };
      }
      next(redirectData);
      return;
    }

    // if (asyncRouteStore.getIsDynamicAddedRoute) {
    //   next();
    //   return;
    // }

    // const user = store.getters.getUserInfo();

    build().then((res) => {
      if (res) {
        const routes = res.data;
        // 动态添加可访问路由表
        routes.forEach((item: any) => {
          console.log(item);
          router.addRoute(item as unknown as RouteRecordRaw);
        });

        //添加404
        const isErrorPage = router
          .getRoutes()
          .findIndex((item) => item.name === ErrorPageRoute.name);
        if (isErrorPage === -1) {
          router.addRoute(ErrorPageRoute as unknown as RouteRecordRaw);
        }
        next("/");
      }
    });
  });

  router.afterEach((to, _) => {
    document.title = (to?.meta?.title as string) || document.title;
  });

  router.onError((error) => {
    console.log(error, "路由错误");
  });
}
