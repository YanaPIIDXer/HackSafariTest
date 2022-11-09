import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

const app = createApp(App)

// VueRouter
import router from "./routes"
app.use(router)

app.mount('#app')
