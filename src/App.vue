<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import { zhCN, dateZhCN, darkTheme, NConfigProvider } from "naive-ui";
import { computed } from "vue";
import { useStore } from "vuex";
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import { AppProvider } from "@/components/Application";

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
const getDarkTheme = computed(() =>
  useStore().getters.darkTheme ? darkTheme : undefined
);
</script>

<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN" :theme="getDarkTheme">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </NConfigProvider>
</template>

<style></style>
