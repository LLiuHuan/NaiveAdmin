/**

 在绑定元素的 attribute 或事件监听器被应用之前调用
 created
 在绑定元素的父组件挂载之前调用
 bind → beforeMount
 绑定元素的父组件被挂载时调用
 inserted → mounted
 在包含组件的 VNode 更新之前调用
 beforeUpdate: new! this is called before the element itself is updated, much like the component lifecycle hooks.
 update → removed! There were too many similarities to updated, so this is redundant. Please use updated instead.
 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
 componentUpdated → updated
 在绑定元素的父组件卸载之前调用
 beforeUnmount: new! similar to component lifecycle hooks, this will be called right before an element is unmounted.
 卸载绑定元素的父组件时调用
 unbind -> unmounted

 */
// import store from "@/store";

export default {
  mounted(el: any, binding: any) {
    const { value } = binding;
    const roles = ["job:add", "job:edit"];
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value;

      const hasPermission = roles.some((role: any) => {
        return permissionRoles.includes(role);
      });

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`使用方式： v-permission="['admin','editor']"`);
    }
  },
};
