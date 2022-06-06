import { createApp } from 'vue'
import App from './App.vue'
import router from './route'
import store from './store/index'

const app = createApp(App)
app.use(router)
app.use(store)

import { ElLoading } from 'element-plus'
app.use(ElLoading)
import 'element-plus/dist/index.css'

app.mount('#app')
