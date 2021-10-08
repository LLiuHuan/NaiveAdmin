import { ComponentType } from "./index";
import type { CSSProperties } from "vue";
import type { GridProps, GridItemProps } from "naive-ui/lib/grid";
import type { ButtonProps } from "naive-ui/lib/button";

// 表单项的参数
export interface FormSchema {
  field: string; // 表单字段
  label: string; // 标签信息
  labelMessage?: string; // 标签右侧温馨提示
  labelMessageStyle?: object | string; // 标签右侧温馨提示的央视
  defaultValue?: any; // 默认值
  component?: ComponentType; // 组件类型
  componentProps?: object; // 组件传过来的值
  slot?: string; // 插槽
  rules?: object | object[]; // 校验
  giProps?: GridItemProps; // 栅格传过来的参数
  isFull?: boolean; // 是否占满
  suffix?: string; // 后缀 组件后面的内容
}

// 表单的参数
export interface FormProps {
  model?: Recordable; // 表项中收集到的值的对象
  labelWidth?: number | string; // 标签的宽度
  schemas?: FormSchema[]; // 表单配置规则
  inline: boolean; // 是否展示未行内表单
  layout?: string; // 布局方式
  size: string; // 尺寸
  labelPlacement: string; // 标签显示的位置
  isFull: boolean; // 是否占满 width 100%
  showActionButtonGroup?: boolean; // 是否显示按钮组 （查询/重置）
  showResetButton?: boolean; // 是否显示重置按钮
  resetButtonOptions?: Partial<ButtonProps>; // 重置按钮配置项
  showSubmitButton?: boolean; // 是否显示检索按钮
  showAdvancedButton?: boolean; // 是否显示后面的折叠按钮 展开收起
  submitButtonOptions?: Partial<ButtonProps>; // 检索按钮配置项
  submitButtonText?: string; // 检索按钮的文字
  resetButtonText?: string; // 重置按钮的文字
  gridProps?: GridProps; // 栅格的参数
  giProps?: GridItemProps; // 栅格节点的参数
  resetFunc?: () => Promise<void>; // 重置方法
  submitFunc?: () => Promise<void>; // 检索方法
  submitOnReset?: boolean; // 检索后是否刷新
  baseGridStyle?: CSSProperties; // 栅格样式
}

// 执行表单
export interface FormActionType {
  submit: () => Promise<any>; // 提交表单
  setProps: (formProps: Partial<FormProps>) => Promise<void>; // 设置参数
  setFieldsValue: <T>(values: T) => Promise<void>; // 设置表单字段值
  clearValidate: (name?: string | string[]) => Promise<void>; // 清空校验
  getFieldsValue: () => Recordable; // 获取表单值
  resetFields: () => Promise<void>; // 重置
  validate: (nameList?: any[]) => Promise<any>; // 验证表单
}

export interface FormPermission {
  add: [];
  edit: [];
  del: [];
  sub: [];
  reset: [];
}

export type RegisterFn = (formInstance: FormActionType) => void;

export type UseFormReturnType = [RegisterFn, FormActionType];
