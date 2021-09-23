import { createApp } from 'vue'
import App from './App.vue'
import {setupNaive} from "./plugins/naive";
import {setupStore} from "./store";
import {setupRouter} from "./router"

const app = createApp(App)

// 注册 naive-ui 组件
setupNaive(app)

// 挂载vuex状态管理
setupStore(app)

// 挂载路由
setupRouter(app)

app.mount('#app')
