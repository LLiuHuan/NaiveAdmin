<template>
  <n-card>
    <NForm v-bind="getBindValue" :model="formModel" ref="formElRef">
      <NGrid v-bind="getGrid">
        <!--form的前半部分-->
        <NGi
          v-bind="schema.giProps"
          v-for="schema in getSchema"
          :key="schema.field"
        >
          <NFormItem :label="schema.label" :path="schema.field">
            <!--标签名右侧的温馨提示-->
            <template #label v-if="schema.labelMessage">
              {{ schema.label }}
              <NTooltip trigger="hover" :style="schema.labelMessageStyle">
                <template #trigger>
                  <NIcon size="18" class="cursor-pointer text-gray-400">
                    <QuestionCircleOutlined />
                  </NIcon>
                </template>
                {{ schema.labelMessage }}
              </NTooltip>
            </template>

            <!--判断插槽-->
            <template v-if="schema.slot">
              <slot
                :name="schema.slot"
                :model="formModel"
                :field="schema.field"
                :value="formModel[schema.field]"
              ></slot>
            </template>

            <!--复选框 NCheckbox-->
            <template v-else-if="schema.component === 'NCheckbox'">
              <n-checkbox-group v-model:value="formModel[schema.field]">
                <n-space>
                  <n-checkbox
                    v-for="item in schema.componentProps.options"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  />
                </n-space>
              </n-checkbox-group>
            </template>

            <!--单选框 NRadioGroup-->
            <template v-else-if="schema.component === 'NRadioGroup'">
              <n-radio-group v-model:value="formModel[schema.field]">
                <n-space>
                  <n-radio
                    v-for="item in schema.componentProps.options"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </n-radio>
                </n-space>
              </n-radio-group>
            </template>

            <!--动态渲染表单组件-->
            <component
              v-else
              v-bind="getComponentProps(schema)"
              :is="schema.component"
              v-model:value="formModel[schema.field]"
              :class="{ isFull: schema.isFull !== false && getProps.isFull }"
            />

            <!--组件后面的内容-->
            <template v-if="schema.suffix">
              <slot
                :name="schema.suffix"
                :model="formModel"
                :field="schema.field"
                :value="formModel[schema.field]"
              ></slot>
            </template>
          </NFormItem>
        </NGi>
        <NGi
          :span="isInline ? '' : 24"
          :suffix="isInline ? true : false"
          #="{ overflow }"
          v-if="getProps.showActionButtonGroup"
        >
          <NSpace
            align="center"
            :justify="isInline ? 'end' : 'start'"
            :style="{
              'margin-left': `${isInline ? 12 : getProps.labelWidth}px`,
            }"
          >
            <NButton
              v-if="getProps.showSubmitButton"
              v-bind="getSubmitBtnOptions"
              @click="handleSubmit"
              :loading="loadingSub"
              v-permission="permission.sub"
            >
              {{ getProps.submitButtonText }}
            </NButton>
            <NButton
              v-if="getProps.showResetButton"
              v-bind="getResetBtnOptions"
              @click="resetFields"
              v-permission="permission.reset"
            >
              {{ getProps.resetButtonText }}
            </NButton>
            <NButton
              type="primary"
              text
              icon-placement="right"
              v-if="isInline && getProps.showAdvancedButton"
              @click="unfoldToggle"
            >
              <template #icon>
                <n-icon size="14" class="unfold-icon" v-if="overflow">
                  <DownOutlined />
                </n-icon>
                <n-icon size="14" class="unfold-icon" v-else>
                  <UpOutlined />
                </n-icon>
              </template>
              {{ overflow ? "展开" : "收起" }}
            </NButton>
          </NSpace>
        </NGi>
      </NGrid>
    </NForm>
  </n-card>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  Ref,
  ref,
  unref,
  watch,
} from "vue";
import { basicProps } from "./props";
import { FormActionType, FormProps, FormSchema } from "./types/form";
import { isArray } from "@/utils/is";
import { GridProps } from "naive-ui/lib/grid";
import { DownOutlined, UpOutlined, QuestionCircleOutlined } from "@vicons/antd";
import { createPlaceholderMessage } from "@/components/BasicForm/src/helper";
import { ComponentType } from "@/components/BasicForm/src/types";
import { useFormValues } from "@/components/BasicForm/src/hooks/useFormValues";
import { useFormEvents } from "@/components/BasicForm/src/hooks/useFormEvents";
import { deepMerge } from "@/utils";

export default defineComponent({
  name: "BasicForm",
  components: {
    DownOutlined,
    UpOutlined,
    QuestionCircleOutlined,
  },
  props: {
    ...basicProps,
  },
  emits: ["reset", "submit", "register"],
  setup(props, { emit, attrs }) {
    const defaultFormModel = ref<Recordable>({});
    const formModel = reactive<Recordable>({}); // 获取表项中收集到的值的对象
    const formElRef = ref<Nullable<FormActionType>>(null); // 获取表单的ref对象
    const propsRef = ref<Partial<FormProps>>({}); // 表单所需的props值
    const schemaRef = ref<Nullable<FormSchema[]>>(null); // 表单项
    const gridCollapsed = ref(true); // 是否默认折叠
    const loadingSub = ref(false); // 按钮加载中
    const isUpdateDefaultRef = ref(false);

    // 获取检索按钮的参数
    const getSubmitBtnOptions = computed(() => {
      return Object.assign(
        {
          size: props.size,
          type: "primary",
        },
        props.submitButtonOptions
      );
    });

    // 获取重置按钮的参数
    const getResetBtnOptions = computed(() => {
      return Object.assign(
        {
          size: props.size,
          type: "default",
        },
        props.resetButtonOptions
      );
    });

    // 获取props的值 传过来的值
    const getProps = computed((): FormProps => {
      // 拼接props的值
      const formProps = { ...props, ...unref(propsRef) } as FormProps;
      // 校验方法
      const rulesObj: any = {
        rules: {},
      };
      const schemas: FormSchema[] = formProps.schemas || [];
      schemas.forEach((item) => {
        if (item.rules && isArray(item.rules)) {
          rulesObj.rules[item.field] = item.rules;
        }
      });
      return { ...formProps, ...unref(rulesObj) };
    });

    // 获取绑定的值
    const getBindValue = computed(
      () => ({ ...attrs, ...props, ...unref(getProps) } as Recordable)
    );

    // 获取布局样式是否等于inline
    const isInline = computed(() => {
      const { layout } = unref(getProps);
      return layout === "inline";
    });

    // 获取栅格的全部参数
    const getGrid = computed((): GridProps => {
      const { gridProps } = unref(getProps);
      return {
        ...gridProps,
        collapsed: isInline.value ? gridCollapsed.value : false,
        responsive: "screen",
      };
    });

    // 获取表单的所有表单项
    const getSchema = computed((): FormSchema[] => {
      const schemas: FormSchema[] =
        unref(schemaRef) || (unref(getProps).schemas as any);
      console.log(schemas);
      for (const schema of schemas) {
        const { defaultValue } = schema;
        // handle date type
        // dateItemType.includes(component as string)
        if (defaultValue) {
          schema.defaultValue = defaultValue;
        }
      }
      return schemas as FormSchema[];
    });

    // 获取表单的标签参数
    function getComponentProps(schema: any) {
      const compProps = schema.componentProps ?? {};
      const component = schema.component;
      return {
        clearable: true,
        placeholder: createPlaceholderMessage(
          unref(component as ComponentType)
        ),
        ...compProps,
      };
    }

    // 展开折叠
    function unfoldToggle() {
      gridCollapsed.value = !gridCollapsed.value;
    }

    const { handleFormValues, initDefault } = useFormValues({
      getProps,
      defaultFormModel,
      getSchema,
      formModel,
    });

    const {
      handleSubmit,
      validate,
      resetFields,
      getFieldsValue,
      clearValidate,
      setFieldsValue,
    } = useFormEvents({
      emit,
      getProps,
      formModel,
      getSchema,
      formElRef: formElRef as Ref<FormActionType>,
      defaultFormModel,
      loadingSub,
      handleFormValues,
    });

    async function setProps(formProps: Partial<FormProps>): Promise<void> {
      propsRef.value = deepMerge(unref(propsRef) || {}, formProps);
    }

    const formActionType: Partial<FormActionType> = {
      getFieldsValue,
      setFieldsValue,
      resetFields,
      validate,
      clearValidate,
      setProps,
      submit: handleSubmit,
    };

    watch(
      () => getSchema.value,
      (schema) => {
        if (unref(isUpdateDefaultRef)) {
          return;
        }
        if (schema?.length) {
          initDefault();
          isUpdateDefaultRef.value = true;
        }
      }
    );

    onMounted(() => {
      initDefault();
      emit("register", formActionType);
    });

    return {
      formElRef,
      formModel,
      getBindValue,
      getGrid,
      getSchema,
      getProps,
      isInline,
      getComponentProps,
      getSubmitBtnOptions,
      getResetBtnOptions,
      handleSubmit,
      loadingSub,
      resetFields,
      unfoldToggle,
    };
  },
});
</script>

<style lang="less" scoped>
.isFull {
  width: 100%;
  justify-content: flex-start;
}

.unfold-icon {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: -3px;
}
</style>
