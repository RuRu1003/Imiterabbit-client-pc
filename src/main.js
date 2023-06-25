import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import UI from './components/library'

// 重置样式的库
import 'normalize.css'
import '@/assets/styles/common.less'

import './mock'

createApp(App).use(store).use(router).use(UI).mount('#app')
