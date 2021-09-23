<template>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useDialog} from "naive-ui";

export default defineComponent({
  name: "DialogContent",
  setup() {
    //挂载在 window 方便与在js中使用
    window['$dialog'] = useDialog();
  }
})
</script>

<style scoped>

</style>
