import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useStore } from './stores/global'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

const store = useStore()
store.initWorker()
