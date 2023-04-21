import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ui from './components/library'

// 重置样式的库
import 'normalize.css'
import '@/assets/styles/common.less'

createApp(App).use(store).use(router).use(ui).mount('#app')
