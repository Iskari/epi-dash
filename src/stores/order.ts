import { defineStore, acceptHMRUpdate } from 'pinia'
import Order from '../models/Order'
import ScheduleType from '../models/ScheduleType'
import dayjs from 'dayjs'
import { useStore as useConfigStore } from './config'

export const useStore = defineStore('orders', {
  state: () => {
    return {
      orders: new Map<number, Order>()
    }
  },
  getters: {
    sortedOrders: (state) => {
      const configStore = useConfigStore()
      const raw = Array.from(state.orders.values())
      const sortedOrders = raw
        .filter((order) => !order.is_sale && order.has_edge_in_chart_range)
        .sort(sortShortTimeEvents)

      if (configStore.showSaleElements) {
        const saleEvents = raw
          .filter((order) => order.is_sale)
          .sort(getSimpleOrderSorter(ScheduleType.Sale))

        sortedOrders.push(...saleEvents)
      }

      const longTimeEvents = raw
        .filter((order) => !(order.is_sale || order.has_edge_in_chart_range))
        .sort(getSimpleOrderSorter(configStore.sortByType))

      sortedOrders.push(...longTimeEvents)
      return sortedOrders
    }
  },
  actions: {
    addOrUpdateOrder(orderData: Order): boolean {
      try {
        const order = Order.restore(orderData)
        this.orders.set(order.order_no, order)
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
    clearOrders() {
      this.orders.clear()
    }
  }
})

function sortShortTimeEvents(left: Order, right: Order): number {
  const configStore = useConfigStore()

  const is_after = left.is_after(right, configStore.sortByType)
  const left_has_passed = left.has_passed()
  const right_has_passed = right.has_passed()

  return + (
    (left_has_passed && !right_has_passed && !(!left_has_passed || right_has_passed)) ||
    (is_after && !(left_has_passed || right_has_passed))
  )
}

function getSimpleOrderSorter(type: ScheduleType) {
  return (left: Order, right: Order) : number => {
    if (!left.firstScheduleOfType && !right.firstScheduleOfType) {
      return 0
    }
    const left_schedule = left.firstScheduleOfType(type) || {end: 0}
    const right_schedule = right.firstScheduleOfType(type) || {end: 0}
    return (left_schedule.end > right_schedule.end) ? 1 : -1
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
