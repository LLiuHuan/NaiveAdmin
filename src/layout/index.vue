<template>
  <NLayout class="layout" :position="fixedMenu" has-sider>
    <NLayoutSider
      v-if="
        isMixMenuNoneSub &&
        (navMode === 'vertical' || navMode === 'horizontal-mix')
      "
      @collapse="collapsed = true"
      :position="fixedMenu"
      @expand="collapsed = false"
      :collapsed="collapsed"
      collapse-mode="width"
      :width="leftMenuWidth"
      :inverted="inverted"
      class="layout-sider"
      :collapsed-width="64"
      :native-scrollbar="false"
    >
      <Logo :collapsed="collapsed" />
      <AsideMenu
        v-model:collapsed="collapsed"
        v-model:location="getMenuLocation"
      />
    </NLayoutSider>
    <NLayout>
      <NLayoutHeader :inverted="getHeaderInverted" :position="fixedHeader">
        <PageHeader v-model:collapsed="collapsed" :inverted="inverted" />
      </NLayoutHeader>

      <NLayoutContent
        class="layout-content"
        :class="{ 'layout-default-background': darkTheme === false }"
      >
        <div
          class="layout-content-main"
          :class="{
            'layout-content-main-fix': fixedMulti,
            'fluid-header': fixedHeader === 'static',
          }"
        >
          <RouterView />
        </div>
      </NLayoutContent>
      <NLayoutFooter class="flex justify-center">
        <span> @123 </span>
      </NLayoutFooter>
    </NLayout>
  </NLayout>
</template>

<script lang="ts">
import { defineComponent, computed, unref, ref } from "vue";
import { useStore } from "vuex";
import { Logo } from "./components/Logo";
import { PageHeader } from "./components/Header";
import { AsideMenu } from "./components/Menu";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "",
  components: {
    Logo,
    PageHeader,
    AsideMenu,
  },
  setup() {
    const store = useStore();

    // 是否显示logo
    const collapsed = ref<boolean>(false);
    // 导航模式 vertical 左侧菜单模式 horizontal 顶部菜单模式
    const navMode = store.getters.getProjectNavMode;

    // 固定顶部 absolute or static
    const fixedMenu = computed(() => {
      const { fixed } = unref(store.getters.getHeaderSetting);
      return fixed ? "absolute" : "static";
    });

    // 深色主题
    const darkTheme = store.getters.getDarkTheme;

    // 判断是否显示左侧菜单
    const isMixMenuNoneSub = computed(() => {
      const mixMenu = store.getters.getMenuSetting;
      const currentRoute = useRoute();
      if (unref(navMode) != "horizontal-mix") return true;
      return !(
        unref(navMode) === "horizontal-mix" &&
        mixMenu &&
        currentRoute.meta.isRoot
      );
    });

    // 左侧菜单宽度
    const leftMenuWidth = computed(() => {
      const { minMenuWidth, menuWidth } = unref(store.getters.getMenuSetting);
      return collapsed.value ? minMenuWidth : menuWidth;
    });

    // 导航风格 dark 暗色侧边栏 light 白色侧边栏 header-dark 暗色顶栏
    const inverted = computed(() => {
      return ["dark", "header-dark"].includes(
        unref(store.getters.getProjectNavTheme)
      );
    });

    // 获取头部的导航风格
    const getHeaderInverted = computed(() => {
      const navTheme = unref(store.getters.getProjectNavTheme);
      return ["light", "header-dark"].includes(navTheme)
        ? unref(inverted)
        : !unref(inverted);
    });

    // 固定顶部
    const fixedHeader = computed(() => {
      const { fixed } = unref(store.getters.getHeaderSetting);
      return fixed ? "absolute" : "static";
    });

    // 固定多标签
    const fixedMulti = computed(() => {
      return unref(store.getters.getMultiTabsSetting).fixed;
    });

    const getMenuLocation = computed(() => {
      return "left";
    });

    return {
      fixedMenu,
      collapsed,
      isMixMenuNoneSub,
      navMode,
      leftMenuWidth,
      inverted,
      getHeaderInverted,
      fixedHeader,
      darkTheme,
      fixedMulti,
      getMenuLocation,
    };
  },
});
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  flex-direction: row;
  flex: auto;

  &-default-background {
    background: #f5f7f9;
  }

  .layout-sider {
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
  }

  .layout-sider-fix {
    position: fixed;
    top: 0;
    left: 0;
  }

  .ant-layout {
    overflow: hidden;
  }

  .layout-right-fix {
    overflow-x: hidden;
    padding-left: 200px;
    min-height: 100vh;
    transition: all 0.2s ease-in-out;
  }

  .layout-content {
    flex: auto;
    min-height: 97vh;
  }

  .n-layout-header.n-layout-header--absolute-positioned {
    z-index: 11;
  }

  .n-layout-footer {
    background: none;
  }

  .layout-footer {
    flex: auto;
    min-height: 3vh;
  }
}

.layout-content-main {
  margin: 0 10px 10px;
  position: relative;
  padding-top: 64px;
}

.layout-content-main-fix {
  padding-top: 64px;
}

.fluid-header {
  padding-top: 0;
}

.main-view-fix {
  padding-top: 44px;
}

.noMultiTabs {
  padding-top: 0;
}
</style>
