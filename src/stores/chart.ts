import { defineStore, acceptHMRUpdate } from 'pinia'
import { useElementSize } from '@vueuse/core'

import type { Ref } from 'vue'
import { watch } from 'vue'

import dayjs from 'dayjs'

interface ElementSize {
  width: number,
  height: number
}

export const useStore = defineStore('chart', {
  state: () => {
    return {
      updateInterval: 5000,
      rowHeight: 40,
      _size: {width: 0, height: 0} as ElementSize,
      isLoading: false
    }
  },
  getters: {
    is_loading: (state): boolean => {
      return state.isLoading
    },
    size: (state) : ElementSize => {
      return state._size
    }
  },
  actions: {
    setChartDimensions(chart: Ref<HTMLElement | null>): void {
      const size = useElementSize(chart)
      watch([size.width, size.height], () => {
        this._size.width = size.width.value
        this._size.height = size.height.value
      })
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
