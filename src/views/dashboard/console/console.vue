<template>
  <NH1>主控台</NH1>
  <!--  <NButton v-permission="permission.add">按钮1</NButton>-->
  <p v-permission="['admin']">123</p>
  <!--工具栏-->
  <div class="head-container">
    <CrudOperation :permission="permission" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CrudOperation from "@/components/CRUD/CRUD.operation.vue";
export default defineComponent({
  name: "",
  components: {
    CrudOperation,
  },
  setup() {
    const permission = {
      add: ["admin", "job:add"],
      edit: ["admin", "job:edit"],
      del: ["admin", "job:del"],
    };
    return {
      permission,
    };
  },
});
</script>

<style scoped></style>
