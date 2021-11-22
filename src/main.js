import { createApp } from 'vue'
import App from './App.vue'
import router from './route'
import store from './store/index'

import 'element-plus/dist/index.css'
// import '@/assets/css/flex-custom.scss'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
