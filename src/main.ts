import "./styles/tailwind.css";
import { createApp } from "vue";
import App from "./App.vue";
import { setupNaive } from "./plugins/naive";
import { setupStore } from "./store";
import { setupRouter } from "./router";
import { setupPermission } from "./components/Permission";
// @ts-ignore
import MakeitCaptcha from "makeit-captcha";
import "makeit-captcha/dist/captcha.min.css";

const app = createApp(App);

app.use(MakeitCaptcha);

// 注册 naive-ui 组件
setupNaive(app);

setupPermission(app);

// 挂载vuex状态管理
setupStore(app);

// 挂载路由
setupRouter(app);

app.mount("#app");
