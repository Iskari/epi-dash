<script setup lang="ts">
import { useStore } from '../stores/global'
import OrderTimeTable from './OrderTimeTable.vue'
import OrderTimeTableRow from './OrderTimeTableRow.vue'
import { onMounted, onUnmounted } from 'vue'
import DashboardError from './DashboardError.vue'
import { RefreshDouble } from '@iconoir/vue'

const state = useStore()
onMounted(() => {
  state.hasError = false
  state.startWorker()
})

onUnmounted(() => {
  state.stopWorker()
})
</script>

<template>
  <dashboard-error v-if="state.has_error"></dashboard-error>
  <div v-else-if="state.chart.is_loading" role="status" class="flex h-full">
    <refresh-double aria-hidden="true" class="w-20 h-20 text-gray-400 animate-spin dark:text-gray-600 m-auto"/>
    <span class="sr-only">Loading...</span>
  </div>

  <order-time-table v-else>
    <order-time-table-row
      v-for="order in state.orders.sortedOrders"
      :order="order"
      :key="order.order_no"
    />
  </order-time-table>
</template>
