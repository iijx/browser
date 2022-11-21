import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "@csstools/normalize.css";

import { createPinia } from 'pinia'
import { createGuard } from '@authing/guard-vue3';

// import 'vue-fullpage.js/dist/style.css'
// import './fullpage.scrollHorizontally.min' // Optional. When using fullpage extensions
// import VueFullPage from 'vue-fullpage.js'
// import useUser from './compositions/useUser'

const host = import.meta.env.DEV ? 'http://localhost:8080' : 'https://home.pastecuts.cn';

const app = createApp(App)
// app.use(VueFullPage)
app
.use(createPinia())
.use(createGuard({
    appId: '63498aa1da8437597fe8ca7a',
    mode: 'modal',
    // 默认情况下，会使用你在 Authing 控制台中配置的第一个回调地址为此次认证使用的回调地址。
    // 如果你配置了多个回调地址，也可以手动指定（此地址也需要加入到应用的「登录回调 URL」中）：
    redirectUri: host,
    host: 'https://home.pastecuts.cn',
}))
.mount('#app')

// useUser();
