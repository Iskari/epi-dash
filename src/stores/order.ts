import { defineStore, acceptHMRUpdate } from 'pinia'
import Order from '../models/Order'
import dayjs from 'dayjs'

export const useStore = defineStore('orders', {
  state: () => {
    return {
      orders: new Map<number, Order>()
    }
  },
  getters: {
    sortedOrders: (state) => {
      const result = Array.from(state.orders.values()).sort((left, right) => {
        if(left.dispo !== null) {
          if(right.dispo !== null) {
            return dayjs(left.dispo.end).diff(right.dispo.end)
          } else {
            return 1;
          }
        }
        return -1;
      })
      return result
    }
  },
  actions: {
    addOrUpdateOrder(order: Order): boolean {
      try {
        this.orders.set(order.order_no, order)
        return true
      } catch (e) {
        return false
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
