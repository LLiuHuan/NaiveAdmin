<template>
  <NMenu
    :options="menus"
    :inverted="inverted"
    :mode="mode"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    :indent="24"
    :expanded-keys="openKeys"
    :value="getSelectedKeys"
    @update:value="clickMenuItem"
    @update:expanded-keys="menuExpanded"
  />
</template>

<script lang="ts">
import { generatorMenu, generatorMenuMix } from "@/utils";
import {
  computed,
  defineComponent,
  reactive,
  ref,
  toRefs,
  unref,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { asyncRoutes } from "@/router";

export default defineComponent({
  name: "Menu",
  props: {
    mode: {
      // 菜单模式
      type: String,
      default: "vertical",
    },
    collapsed: {
      // 侧边栏菜单是否收起
      type: Boolean,
    },
    //位置
    location: {
      type: String,
      default: "left",
    },
  },
  emits: ["update:collapsed"],
  setup(props, { emit }) {
    // 当前路由
    const currentRoute = useRoute();
    // router
    const router = useRouter();

    // vuex
    const store = useStore();

    // 路由列表
    const menus = generatorMenu(asyncRoutes);
    // const menus = ref<any[]>([]);

    // 导航模式
    const { navMode, navTheme } = store.getters.getProjectSetting;

    // 当前打开菜单名称
    const selectedKeys = ref<string>(currentRoute.name as string);
    // 导航菜单名称
    const headerMenuSelectKey = ref<string>("");

    // 使用反转样式
    const inverted = computed(() => {
      return ["dark", "header-dark"].includes(navTheme);
    });

    // 获取当前打开的子菜单
    const matched = currentRoute.matched;

    const getOpenKeys =
      matched && matched.length ? matched.map((item) => item.name) : [];

    const state = reactive({
      openKeys: getOpenKeys,
    });

    const getSelectedKeys = computed(() => {
      let location = props.location;
      return location === "left" ||
        (location === "header" && unref(navMode) === "horizontal")
        ? unref(selectedKeys)
        : unref(headerMenuSelectKey);
    });

    // 点击菜单
    function clickMenuItem(key: string) {
      if (/http(s)?:/.test(key)) {
        window.open(key);
      } else {
        router.push({ name: key });
      }
    }

    //展开菜单
    function menuExpanded(openKeys: string[]) {
      if (!openKeys) return;
      const latestOpenKey = openKeys.find(
        (key) => state.openKeys.indexOf(key) === -1
      );
      const isExistChildren = findChildrenLen(latestOpenKey as string);
      state.openKeys = isExistChildren
        ? latestOpenKey
          ? [latestOpenKey]
          : []
        : openKeys;
    }

    //查找是否存在子路由
    function findChildrenLen(key: string) {
      if (!key) return false;
      const subRouteChildren: string[] = [];
      for (const { children, key } of unref(menus)) {
        if (children && children.length) {
          subRouteChildren.push(key as string);
        }
      }
      return subRouteChildren.includes(key);
    }

    function updateMenu() {
      if (!store.getters.getMenuSetting.mixMenu) {
        menus.value = generatorMenu(store.getters.getMenus);
      } else {
        //混合菜单
        const firstRouteName: string =
          (currentRoute.matched[0].name as string) || "";
        menus.value = generatorMenuMix(
          store.getters.getMenus,
          firstRouteName,
          props.location
        );
        const activeMenu: string = currentRoute?.matched[0].meta
          ?.activeMenu as string;
        headerMenuSelectKey.value =
          (activeMenu ? activeMenu : firstRouteName) || "";
      }
    }

    // 监听分割菜单
    watch(
      () => store.getters.getMenuSetting.mixMenu,
      () => {
        updateMenu();
        if (props.collapsed) {
          emit("update:collapsed", !props.collapsed);
        }
      }
    );

    // 监听菜单收缩状态
    watch(
      () => props.collapsed,
      (newVal) => {
        state.openKeys = newVal ? [] : getOpenKeys;
        selectedKeys.value = currentRoute.name as string;
      }
    );

    // 跟随页面路由变化，切换菜单选中状态
    watch(
      () => currentRoute.fullPath,
      () => {
        updateMenu();
        const matched = currentRoute.matched;
        state.openKeys = matched.map((item) => item.name);
        const activeMenu: string =
          (currentRoute.meta?.activeMenu as string) || "";
        selectedKeys.value = activeMenu
          ? (activeMenu as string)
          : (currentRoute.name as string);
      }
    );

    return {
      ...toRefs(state),
      menus,
      inverted,
      getSelectedKeys,
      clickMenuItem,
      menuExpanded,
    };
  },
});
</script>

<style scoped></style>
