import { createApp } from 'vue'
import MojHome from './MojHome.vue'
import router from './router/index'
import axios from 'axios'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(MojHome)

app.config.globalProperties.$axios = axios;
app.use(ElementPlus)
app.use(router)
app.use(store)

app.mount('#app')
