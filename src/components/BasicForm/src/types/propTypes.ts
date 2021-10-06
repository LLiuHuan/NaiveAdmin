import { CSSProperties, VNodeChild } from "vue";
import { createTypes, VueTypeValidableDef, VueTypesInterface } from "vue-types";

export type VueNode = VNodeChild | JSX.Element;

type PropTypes = VueTypesInterface & {
  readonly style: VueTypeValidableDef<CSSProperties>;
  readonly VNodeChild: VueTypeValidableDef<VueNode>;
};

const propTypes = createTypes({
  func: undefined, // 方法
  bool: undefined, // 布尔
  string: undefined, // 字符串
  number: undefined, // 数字
  object: undefined, // 集合
  integer: undefined, // 整数
}) as PropTypes;

propTypes.extend([
  {
    name: "style",
    getter: true,
    type: [String, Object],
    default: undefined,
  },
  {
    name: "VNodeChild",
    getter: true,
    type: undefined,
  },
]);
export { propTypes };
