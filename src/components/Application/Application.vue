<template>
  <NLoadingBarProvider>
    <NDialogProvider>
      <DialogContent />
      <NNotificationProvider>
        <NMessageProvider>
          <MessageContent />
          <slot slot="default"></slot>
        </NMessageProvider>
      </NNotificationProvider>
    </NDialogProvider>
  </NLoadingBarProvider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  NDialogProvider,
  NNotificationProvider,
  NMessageProvider,
  NLoadingBarProvider,
} from "naive-ui";
import { DialogContent } from "@/components/DialogContent";
import { MessageContent } from "@/components/MessageContent";

export default defineComponent({
  name: "Application",
  components: {
    NDialogProvider,
    NNotificationProvider,
    NMessageProvider,
    NLoadingBarProvider,
    DialogContent,
    MessageContent,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
