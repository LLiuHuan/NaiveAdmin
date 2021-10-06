<template>
  <div class="crud-opts">
    <span>
      <!--左侧插槽-->
      <slot name="left"></slot>
      <NButton
        v-permission="permission.add"
        size="small"
        type="primary"
        class="filter-item"
        @click="crud"
      >
        <template #icon>
          <n-icon>
            <Add />
          </n-icon>
        </template>
        新增
      </NButton>
      <NButton
        v-permission="permission.edit"
        size="small"
        type="info"
        class="filter-item"
      >
        <template #icon>
          <n-icon>
            <Edit />
          </n-icon>
        </template>
        修改
      </NButton>
      <NButton
        v-permission="permission.del"
        size="small"
        type="error"
        class="filter-item"
      >
        <template #icon>
          <n-icon>
            <Delete />
          </n-icon>
        </template>
        删除
      </NButton>
      <NButton size="small" type="warning" class="filter-item">
        <template #icon>
          <n-icon>
            <Download />
          </n-icon>
        </template>
        导出
      </NButton>
      <!--右侧插槽-->
      <slot name="right"></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Add, Edit, Delete, Download } from "@vicons/carbon";
// import CRUD, { crud } from "@/components/CRUD/crud";
export default defineComponent({
  name: "CrudOperation",
  // mixins: [crud()],
  components: {
    Add,
    Edit,
    Delete,
    Download,
  },
  props: {
    permission: {
      type: Object,
      default: null,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.crud-opts {
  padding: 6px 0;
  display: -webkit-flex;
  display: flex;
  align-items: center;
}
.crud-opts .crud-opts-right {
  margin-left: auto;
}
</style>
