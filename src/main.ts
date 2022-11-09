import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

const app = createApp(App)

// VueRouter
import router from "./routes"
app.use(router)

// PrimeVue
import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import PrimeVue from 'primevue/config'
import PrimeButton from "primevue/button"
import InputText from "primevue/inputtext"
app.use(PrimeVue)
app.component("PrimeButton", PrimeButton)
app.component("InputText", InputText)

app.mount('#app')
