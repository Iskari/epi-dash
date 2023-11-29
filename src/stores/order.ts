import { defineStore, acceptHMRUpdate } from 'pinia'
import Order from '../models/order'
import moment from 'moment'

export const useStore = defineStore('orders', {
  id: 'orders',
  state: () => {
    return {
      orders: new Map<int, Order>()
    }
  },
  getters: {
    sortedOrders: (state) => {
      const result = Array.from(state.orders.values()).sort((left, right) => {
        return moment(left.dispo.end).diff(right.dispo.end)
      })
      return result
    }
  },
  actions: {
    addOrUpdateOrder(orderString: string): bool {
      try {
        const order = Order.rehydrate(orderString)
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
