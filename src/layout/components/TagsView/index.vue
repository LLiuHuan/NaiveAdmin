<template>
  <div
    class="tabs-view"
    :class="{
      'tabs-view-fix': multiTabsSetting.fixed,
      'tabs-view-fixed-header': isMultiHeaderFixed,
      'tabs-view-default-background': getDarkTheme === false,
      'tabs-view-dark-background': getDarkTheme === true,
    }"
    :style="getChangeStyle"
  >
    <div class="tabs-view-main">
      <div
        ref="navWrap"
        class="tabs-card"
        :class="{ 'tabs-card-scrollable': scrollable }"
      >
        <span
          class="tabs-card-prev"
          :class="{ 'tabs-card-prev-hide': !scrollable }"
          @click="scrollPrev"
        >
          <n-icon size="16" color="#515a6e">
            <LeftOutlined />
          </n-icon>
        </span>
        <span
          class="tabs-card-next"
          :class="{ 'tabs-card-next-hide': !scrollable }"
          @click="scrollNext"
        >
          <n-icon size="16" color="#515a6e">
            <RightOutlined />
          </n-icon>
        </span>
        <div ref="navScroll" class="tabs-card-scroll">
          <NSpace>
            <NTag
              v-for="tag in tabsList"
              :type="activeKey === tag.path ? 'success' : ''"
              :closable="tag.path !== baseHome"
              :key="`tag${tag.fullPath.split('/').join('\/')}`"
              @close="closeTabItem(tag)"
            >
              <span
                v-if="activeKey !== tag.path"
                class="cursor-pointer"
                @click="goPage(tag)"
                @contextmenu="handleContextMenu($event, tag)"
                >{{ tag.meta.title }}
              </span>
              <span
                v-else
                class="cursor-pointer"
                @click="goPage(tag)"
                @contextmenu="handleContextMenu($event, tag)"
              >
                <n-badge class="pr-1.5" dot type="success" />{{
                  tag.meta.title
                }}
              </span>
            </NTag>
          </NSpace>
        </div>
      </div>
      <div class="tabs-close">
        <n-dropdown
          trigger="hover"
          @select="closeHandleSelect"
          placement="bottom-end"
          :options="TabsMenuOptions"
        >
          <div class="tabs-close-btn">
            <n-icon size="16" color="#515a6e">
              <DownOutlined />
            </n-icon>
          </div>
        </n-dropdown>
      </div>
      <n-dropdown
        :show="showDropdown"
        :x="dropdownX"
        :y="dropdownY"
        @clickoutside="onClickOutside"
        placement="bottom-start"
        @select="closeHandleSelect"
        :options="TabsMenuOptions"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  reactive,
  ref,
  toRefs,
  unref,
  watch,
} from "vue";
import { useStore } from "vuex";
import { PageEnum } from "@/enums/pageEnum";
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from "vue-router";

import { RouteItem } from "/#/config";
import { MutationType } from "@/store/modules/tabs/mutations";
import { useMessage } from "naive-ui";
import {
  LeftOutlined,
  RightOutlined,
  DownOutlined,
  CloseOutlined,
  ReloadOutlined,
  ColumnWidthOutlined,
  MinusOutlined,
} from "@vicons/antd";
import { renderIcon } from "@/utils";
import { storage } from "@/utils/Storage";
import { TABS_ROUTES } from "@/store/mutation-types";

export default defineComponent({
  name: "",
  components: {
    LeftOutlined,
    RightOutlined,
    DownOutlined,
  },
  props: {
    collapsed: {
      type: Boolean,
    },
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const message = useMessage();
    const state = reactive({
      activeKey: route.fullPath,
      scrollable: false,
      isMultiHeaderFixed: false,
      baseHome: PageEnum.BASE_HOME,
      showDropdown: false,
      dropdownX: 0,
      dropdownY: 0,
    });

    const multiTabsSetting = store.getters.getMultiTabsSetting;
    const getDarkTheme = store.getters.getDarkTheme;
    // 标签页列表
    const tabsList: any = computed(() => store.getters.getTabsList);
    const navScroll: any = ref(null);
    const isCurrent = ref(false);

    // if (tabsList.value.length == 0) {
    //   tabsList.value.push({ people: "cn", id: 1, name: "www.itxst.com" });
    // }

    // 获取简易的路由对象
    const getSimpleRoute = (route: any): RouteItem => {
      const { fullPath, hash, meta, name, params, path, query } = route;
      return { fullPath, hash, meta, name, params, path, query };
    };

    let routes: RouteItem[] = [];

    try {
      const routesStr = storage.get(TABS_ROUTES) as string | null | undefined;
      routes = routesStr ? JSON.parse(routesStr) : [getSimpleRoute(route)];
    } catch (e) {
      routes = [getSimpleRoute(route)];
    }

    console.log(routes);
    // 初始化标签页
    store.commit(MutationType.SET_INIT_TABS, routes);

    const isMixMenuNoneSub = computed(() => {
      const mixMenu = store.getters.getMenuSetting.mixMenu;

      const navMode = unref(store.getters.getProjectNavMode);
      if (unref(navMode) != "horizontal-mix") return true;
      return !(
        unref(navMode) === "horizontal-mix" &&
        mixMenu &&
        route.meta.isRoot
      );
    });

    //动态组装样式 菜单缩进
    const getChangeStyle = computed(() => {
      const { collapsed } = props;
      const navMode = unref(store.getters.getProjectNavMode);
      const { minMenuWidth, menuWidth }: any = unref(
        store.getters.getMenuSetting
      );
      const { fixed }: any = unref(store.getters.getMultiTabsSetting);
      let lenNum =
        navMode === "horizontal" || !isMixMenuNoneSub.value
          ? "0px"
          : collapsed
          ? `${minMenuWidth}px`
          : `${menuWidth}px`;
      return {
        left: lenNum,
        width: `calc(100% - ${!fixed ? "0px" : lenNum})`,
      };
    });

    // 关闭当前页面
    const removeTab = (route: RouteItem | RouteLocationNormalizedLoaded) => {
      if (tabsList.value.length === 1) {
        return message.warning("这已经是最后一页，不能再关闭了！");
      }
      delKeepAliveCompName();
      store.commit(MutationType.SET_CLOSE_CURRENT_TABS, route);
      // 如果关闭的是当前页
      if (state.activeKey === route.fullPath) {
        const currentRoute =
          tabsList.value[Math.max(0, tabsList.value.length - 1)];
        state.activeKey = currentRoute.fullPath;
        router.push(currentRoute);
      }
      // updateNavScroll();
    };

    //tags 跳转页面
    function goPage(e: RouteItem) {
      const { fullPath } = e;
      if (fullPath === route.fullPath) return;
      state.activeKey = fullPath;
      router.push({ path: fullPath });
    }

    //删除tab
    function closeTabItem(e: RouteItem) {
      console.log(e);
      const { fullPath } = e;
      const routeInfo = tabsList.value.find(
        (item: RouteItem) => item.fullPath == fullPath
      );
      removeTab(routeInfo);
    }

    //tags 右侧下拉菜单
    const TabsMenuOptions = computed(() => {
      const isDisabled = unref(tabsList).length <= 1;
      return [
        {
          label: "刷新当前",
          key: "1",
          icon: renderIcon(ReloadOutlined),
        },
        {
          label: `关闭当前`,
          key: "2",
          disabled: unref(isCurrent) || isDisabled,
          icon: renderIcon(CloseOutlined),
        },
        {
          label: "关闭其他",
          key: "3",
          disabled: isDisabled,
          icon: renderIcon(ColumnWidthOutlined),
        },
        {
          label: "关闭全部",
          key: "4",
          disabled: isDisabled,
          icon: renderIcon(MinusOutlined),
        },
      ];
    });

    //tab 操作
    const closeHandleSelect = (key: string) => {
      switch (key) {
        //刷新
        case "1":
          reloadPage();
          break;
        //关闭
        case "2":
          removeTab(route);
          break;
        //关闭其他
        case "3":
          closeOther(route);
          break;
        //关闭所有
        case "4":
          closeAll();
          break;
      }
      updateNavScroll();
      state.showDropdown = false;
    };

    // 刷新页面
    const reloadPage = () => {
      delKeepAliveCompName();
      router.push({
        path: "/redirect" + unref(route).fullPath,
      });
    };

    // 关闭左侧
    const closeLeft = (route: RouteItem | RouteLocationNormalizedLoaded) => {
      store.commit(MutationType.SET_CLOSE_LEFT_TABS, route);
      state.activeKey = route.fullPath;
      router.replace(route.fullPath);
      updateNavScroll();
    };

    // 关闭右侧
    const closeRight = (route: RouteItem | RouteLocationNormalizedLoaded) => {
      store.commit(MutationType.SET_CLOSE_RIGHT_TABS, route);
      state.activeKey = route.fullPath;
      router.replace(route.fullPath);
      updateNavScroll();
    };

    // 关闭其他
    const closeOther = (route: RouteItem | RouteLocationNormalizedLoaded) => {
      store.commit(MutationType.SET_CLOSE_OTHER_TABS, route);
      state.activeKey = route.fullPath;
      router.replace(route.fullPath);
      updateNavScroll();
    };

    // 关闭全部
    const closeAll = () => {
      localStorage.removeItem("routes");
      store.commit(MutationType.SET_CLOSE_ALL_TABS, route);
      router.replace(PageEnum.BASE_HOME);
      updateNavScroll();
    };

    // 右击tab
    function handleContextMenu(
      e: any,
      item: RouteItem | RouteLocationNormalizedLoaded
    ) {
      e.preventDefault();
      isCurrent.value = PageEnum.BASE_HOME_REDIRECT === item.path;
      state.showDropdown = false;
      nextTick().then(() => {
        state.showDropdown = true;
        state.dropdownX = e.clientX;
        state.dropdownY = e.clientY;
      });
    }

    function onClickOutside() {
      state.showDropdown = false;
    }

    // 移除缓存组件名称
    const delKeepAliveCompName = () => {
      if (route.meta.keepAlive) {
        const name = router.currentRoute.value.matched.find(
          (item) => item.name == route.name
        )?.components?.default.name;
        if (name) {
          // asyncRouteStore.keepAliveComponents = asyncRouteStore.keepAliveComponents.filter(
          //   (item) => item != name
          // );
        }
      }
    };

    /**
     * @param value 要滚动到的位置
     * @param amplitude 每次滚动的长度
     */
    function scrollTo(value: number, amplitude: number): any {
      const currentScroll = navScroll.value.scrollLeft;
      const scrollWidth =
        (amplitude > 0 && currentScroll + amplitude >= value) ||
        (amplitude < 0 && currentScroll + amplitude <= value)
          ? value
          : currentScroll + amplitude;
      navScroll.value && navScroll.value.scrollTo(scrollWidth, 0);
      if (scrollWidth === value) return;
      return window.requestAnimationFrame(() => scrollTo(value, amplitude));
    }

    // 滚动 左
    function scrollPrev() {
      const containerWidth = navScroll.value.offsetWidth;
      const currentScroll = navScroll.value.scrollLeft;

      if (!currentScroll) return;
      const scrollLeft =
        currentScroll > containerWidth ? currentScroll - containerWidth : 0;
      scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
    }

    // 滚动 右
    function scrollNext() {
      const containerWidth = navScroll.value.offsetWidth;
      const navWidth = navScroll.value.scrollWidth;
      const currentScroll = navScroll.value.scrollLeft;

      if (navWidth - currentScroll <= containerWidth) return;
      const scrollLeft =
        navWidth - currentScroll > containerWidth * 2
          ? currentScroll + containerWidth
          : navWidth - containerWidth;
      scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
    }

    /**
     * @param autoScroll 是否开启自动滚动功能
     */
    async function updateNavScroll(autoScroll?: boolean) {
      await nextTick();
      if (!navScroll.value) return;
      const containerWidth = navScroll.value.offsetWidth;
      const navWidth = navScroll.value.scrollWidth;

      if (containerWidth < navWidth) {
        state.scrollable = true;
        if (autoScroll) {
          let tagList =
            navScroll.value.querySelectorAll(".tabs-card-scroll-item") || [];
          [...tagList].forEach((tag: HTMLElement) => {
            // fix SyntaxError
            if (tag.id === `tag${state.activeKey.split("/").join("\/")}`) {
              tag.scrollIntoView && tag.scrollIntoView();
            }
          });
        }
      } else {
        state.scrollable = false;
      }
    }

    function handleResize() {
      updateNavScroll(true);
    }

    const whiteList: string[] = [
      PageEnum.BASE_LOGIN_NAME,
      PageEnum.REDIRECT_NAME,
      PageEnum.ERROR_PAGE_NAME,
    ];

    watch(
      () => route.fullPath,
      (to) => {
        if (whiteList.includes(route.name as string)) return;
        state.activeKey = to;
        console.log(getSimpleRoute(route));
        store.commit(MutationType.SET_ADD_TABS, getSimpleRoute(route));
        // updateNavScroll(true);
      },
      { immediate: true }
    );

    return {
      ...toRefs(state),
      getDarkTheme,
      multiTabsSetting,
      getChangeStyle,
      tabsList,
      whiteList,
      goPage,
      closeTabItem,
      scrollPrev,
      scrollNext,
      closeLeft,
      closeRight,
      closeHandleSelect,
      TabsMenuOptions,
      handleContextMenu,
      onClickOutside,
    };
  },
});
</script>

<style lang="less" scoped>
.tabs-view {
  width: 100%;
  padding: 6px 0;
  display: flex;
  transition: all 0.2s ease-in-out;

  &-main {
    height: 32px;
    display: flex;
    max-width: 100%;
    min-width: 100%;

    .tabs-card {
      -webkit-box-flex: 1;
      flex-grow: 1;
      flex-shrink: 1;
      overflow: hidden;
      position: relative;

      .tabs-card-prev,
      .tabs-card-next {
        width: 32px;
        text-align: center;
        position: absolute;
        line-height: 32px;
        cursor: pointer;

        .n-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          width: 32px;
        }
      }

      .tabs-card-prev {
        left: 0;
      }

      .tabs-card-next {
        right: 0;
      }

      .tabs-card-next-hide,
      .tabs-card-prev-hide {
        display: none;
      }

      &-scroll {
        white-space: nowrap;
        overflow: hidden;

        &-item {
          background: var(--color);
          color: var(--text-color);
          height: 32px;
          padding: 6px 16px 4px;
          border-radius: 3px;
          margin-right: 6px;
          cursor: pointer;
          display: inline-block;
          position: relative;
          flex: 0 0 auto;

          span {
            float: left;
            vertical-align: middle;
          }

          &:hover {
            color: #515a6e;
          }

          .n-icon {
            height: 22px;
            width: 21px;
            margin-right: -6px;
            position: relative;
            vertical-align: middle;
            text-align: center;
            color: #808695;

            &:hover {
              color: #515a6e !important;
            }

            svg {
              height: 21px;
              display: inline-block;
            }
          }
        }

        .active-item {
          color: v-bind(getAppTheme);
        }
      }
    }

    .tabs-card-scrollable {
      padding: 0 32px;
      overflow: hidden;
    }
  }

  .tabs-close {
    min-width: 32px;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: var(--color);
    border-radius: 2px;
    cursor: pointer;
    //margin-right: 10px;

    &-btn {
      color: var(--color);
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.tabs-view-default-background {
  background: #f5f7f9;
}

.tabs-view-dark-background {
  background: #101014;
}

.tabs-view-fix {
  position: fixed;
  z-index: 5;
  padding: 6px 19px 6px 10px;
  left: 200px;
}

.tabs-view-fixed-header {
  top: 0;
}
</style>
