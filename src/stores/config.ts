import { defineStore, acceptHMRUpdate } from 'pinia'
import ScheduleType from '../models/ScheduleType'
import dayjs from 'dayjs'
import { useStorage as useLocalStorage } from '@vueuse/core'
import type { RemovableRef } from '@vueuse/core'

export const useStore = defineStore('config', {
  state: () => {
    return {
      showSaleElements: useLocalStorage('showSaleElements', true),
      _sortByType: useLocalStorage('sortByType', ScheduleType.Dispo) as RemovableRef<ScheduleType>,
      updateInterval: 5000,
      startDateModifier: 2,
      endDateModifier: 11,
      api: {
        baseUrl: useLocalStorage('apiBaseUrl', 'http://192.168.1.20:3000'),
        key: useLocalStorage('apiKey', 'E27E013A55554D4BB45476FEBFB05C2B')
      }
    }
  },
  getters: {
    start: (state) => {
      return dayjs().startOf('day').subtract(state.startDateModifier, 'day').toDate()
    },
    end: (state) => {
      return dayjs().startOf('day').add(state.endDateModifier, 'day').toDate()
    },
    sortByType: (state) => {
      return state._sortByType || ScheduleType.Dispo
    },
  },
  actions: {
    toggleSaleElements() {
      this.showSaleElements = !this.showSaleElements
    },
    toggleSortByType() {
      this._sortByType =
        this.sortByType == ScheduleType.Dispo ? ScheduleType.Event : ScheduleType.Dispo
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
