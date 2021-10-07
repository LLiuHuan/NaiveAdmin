<template>
  <NH1>主控台</NH1>
  <!--  <NButton v-permission="permission.add">按钮1</NButton>-->
  <p v-permission="['admin']">123</p>
  <!--工具栏-->
  <div class="head-container">
    <CrudOperation :permission="permission" />
  </div>

  <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">
    <template #statusSlot="{ model, field }">
      <n-input v-model:value="model[field]" />
    </template>
  </BasicForm>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CrudOperation from "@/components/CRUD/CRUD.operation.vue";
import { BasicForm, useForm } from "@/components/BasicForm/index";

export default defineComponent({
  name: "",
  components: {
    CrudOperation,
    BasicForm,
  },
  setup() {
    const permission = {
      add: ["admin", "job:add"],
      edit: ["admin", "job:edit"],
      del: ["admin", "job:del"],
    };

    const schemas = [
      {
        field: "name",
        labelMessage: "这是一个提示",
        component: "NInput",
        label: "姓名",
        componentProps: {
          placeholder: "请输入姓名",
          onInput: (e: any) => {
            console.log(e);
          },
        },
        rules: [{ required: true, message: "请输入姓名", trigger: ["blur"] }],
      },
      {
        field: "mobile",
        component: "NInputNumber",
        label: "手机",
        componentProps: {
          placeholder: "请输入手机号码",
          showButton: false,
          onInput: (e: any) => {
            console.log(e);
          },
        },
      },
      {
        field: "type",
        component: "NSelect",
        label: "类型",
        componentProps: {
          placeholder: "请选择类型",
          options: [
            {
              label: "舒适性",
              value: 1,
            },
            {
              label: "经济性",
              value: 2,
            },
          ],
          onUpdateValue: (e: any) => {
            console.log(e);
          },
        },
      },
      {
        field: "makeDate",
        component: "NDatePicker",
        label: "预约时间",
        defaultValue: 1183135260000,
        componentProps: {
          type: "date",
          clearable: true,
          onUpdateValue: (e: any) => {
            console.log(e);
          },
        },
      },
      {
        field: "makeTime",
        component: "NTimePicker",
        label: "停留时间",
        componentProps: {
          clearable: true,
          onUpdateValue: (e: any) => {
            console.log(e);
          },
        },
      },
      {
        field: "status",
        label: "状态",
        //插槽
        slot: "statusSlot",
      },
      {
        field: "makeProject",
        component: "NCheckbox",
        label: "预约项目",
        componentProps: {
          placeholder: "请选择预约项目",
          options: [
            {
              label: "种牙",
              value: 1,
            },
            {
              label: "补牙",
              value: 2,
            },
            {
              label: "根管",
              value: 3,
            },
          ],
          onUpdateChecked: (e: any) => {
            console.log(e);
          },
        },
      },
      {
        field: "makeSource",
        component: "NRadioGroup",
        label: "来源",
        componentProps: {
          options: [
            {
              label: "网上",
              value: 1,
            },
            {
              label: "门店",
              value: 2,
            },
          ],
          onUpdateChecked: (e: any) => {
            console.log(e);
          },
        },
      },
    ];

    const [register, {}] = useForm({
      gridProps: { cols: "1 s:1 m:2 l:3 xl:4 2xl:4" },
      labelWidth: 80,
      schemas,
    });

    function handleSubmit(values: Recordable) {
      console.log(values);
    }

    function handleReset(values: Recordable) {
      console.log(values);
    }
    return {
      permission,
      register,
      handleSubmit,
      handleReset,
    };
  },
});
</script>

<style scoped></style>
