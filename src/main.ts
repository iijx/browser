import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "@csstools/normalize.css";

import 'vue-fullpage.js/dist/style.css'
// import './fullpage.scrollHorizontally.min' // Optional. When using fullpage extensions
import VueFullPage from 'vue-fullpage.js'
import useUser from './compositions/useUser'

const app = createApp(App)
app.use(VueFullPage)
app.mount('#app')

useUser();
