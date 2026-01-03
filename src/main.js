import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'
import 'admin-lte/dist/css/adminlte.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import 'bootstrap'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
