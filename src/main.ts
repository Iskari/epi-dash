import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import BackgroundWorker from './worker?worker'
import { useStore } from './stores/global'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

if (window.Worker) {
  const worker = new BackgroundWorker()
  const state = useStore()

  worker.postMessage('GO!')
  worker.onmessage = (e) => {
    switch (e.data.type) {
      case 'addOrCreateOrder':
        state.orders.addOrUpdateOrder(e.data.order)
        break
      case 'error':
      default:
        console.log(e)
      // TODO: Error Page;
    }
  }
}
