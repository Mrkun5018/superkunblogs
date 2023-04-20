import './assets/css/global.css'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import plugins from './plugins'
import requsts from './utils/requests'
import init from './utils/utils'

init()
const app = createApp(App)
app.config.globalProperties.$requests = requsts
app.use(router)
app.use(plugins)
app.mount('#app')







