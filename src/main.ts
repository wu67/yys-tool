import { createApp } from 'vue'
import App from './App.vue'
import router from './route'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router)
app.use(createPinia())

import { ElLoading } from 'element-plus'
app.use(ElLoading)
import 'element-plus/dist/index.css'
import '@/assets/css/element-hack.scss'

app.mount('#app')
