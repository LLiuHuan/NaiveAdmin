import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { PageEnum } from "@/enums/pageEnum";
import { RedirectRoute } from "@/router/base";
import { App } from "vue";

const modules = import.meta.globEager("./modules/**/*.ts");

const routeModuleList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

function sortRoute(a: any, b: any) {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0);
}

routeModuleList.sort(sortRoute);

export const RootRouter: RouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: "Root",
  },
};

//需要验证权限
export const asyncRoutes = [...routeModuleList];

//普通路由 无需验证权限
export const constantRouter: any[] = [
  RedirectRoute,
  RootRouter,
  ...routeModuleList,
];

const router = createRouter({
  history: createWebHashHistory(""),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App) {
  app.use(router);

  // 动态添加可访问路由表
  asyncRoutes.forEach((item) => {
    console.log(item);
    router.addRoute(item as unknown as RouteRecordRaw);
  });
  console.log(router);
  // 创建路由守卫
  // createRouterGuards(router);
}

export default router;
