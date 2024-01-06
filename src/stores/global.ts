import { defineStore, acceptHMRUpdate } from 'pinia'
import { useStore as useThemeStore } from './theme'
import { useStore as useOrderStore } from './order'
import { useStore as useChartStore } from './chart'
import { useStore as useConfigStore } from './config'
import BackgroundWorker from '../worker?worker'

export const useStore = defineStore('global', {
  state: () => {
    return {
      theme: useThemeStore(),
      orders: useOrderStore(),
      chart: useChartStore(),
      config: useConfigStore(),
      hasError: false,
      errorMessage: '',
      worker: {
        instance: new BackgroundWorker() as Worker,
        initialized: false,
        running: false
      }
    }
  },
  getters: {
    has_error: (state) => {
      return state.hasError
    }
  },
  actions: {
    initWorker() {
      this.worker.instance.onmessage = this.handleWorkerMessage
      this.worker.initialized = true
    },
    startWorker() {
      console.info('startWorker was called')
      if (!this.worker.initialized) throw new Error('Worker was not initialized')
      this.chart.isLoading = true
      this.worker.instance.postMessage({
        type: 'command',
        data: {
          command: 'start',
          config: {
            api: {
              key: this.config.api.key,
              baseUrl: this.config.api.baseUrl
            },
            updateInterval: this.config.updateInterval,
            startDateModifier: this.config.startDateModifier,
            endDateModifier: this.config.endDateModifier
          }
        }
      })
      this.worker.running = true
    },
    stopWorker() {
      if (!this.worker.initialized) throw new Error('Worker was not initialized')
      this.worker.instance.postMessage({
        type: 'command',
        data: {
          command: 'pause'
        }
      })
      this.worker.running = false
    },
    handleWorkerMessage(message: MessageEvent) {
      switch (message.data.type) {
        case 'addOrUpdateOrder':
          this.hasError = false
          this.chart.isLoading = false
          this.orders.addOrUpdateOrder(message.data.order)
          break
        case 'error':
        default:
          this.hasError = true
          this.errorMessage = message.data.message
          console.log(message)
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
