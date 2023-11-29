import { defineStore, acceptHMRUpdate } from 'pinia'
import { useStore as useThemeStore } from './theme'
import { useStore as useOrderStore } from './order'

export const useStore = defineStore('global', {
  id: 'global',
  state: () => {
    return {
      theme: useThemeStore(),
      orders: useOrderStore()
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
