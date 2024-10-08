import { defineStore, acceptHMRUpdate } from 'pinia'
import { useStorage as useLocalStorage } from '@vueuse/core'

export const useStore = defineStore('theme', {
  state: () => {
    return {
      darkMode: useLocalStorage('darkMode', true)
    }
  },
  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
