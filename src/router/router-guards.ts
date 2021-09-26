import type { RouteRecordRaw } from "vue-router";
import { Router } from "vue-router";
import { ErrorPageRoute } from "@/router/base";
import { asyncRoutes } from "@/router/index";

export function createRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const routes = asyncRoutes;
    // 动态添加可访问路由表
    routes.forEach((item) => {
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
  });

  router.afterEach((to, _) => {
    document.title = (to?.meta?.title as string) || document.title;
  });

  router.onError((error) => {
    console.log(error, "路由错误");
  });
}
