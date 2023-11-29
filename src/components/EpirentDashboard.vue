<script setup lang="ts">
import { useStore } from '../stores/global'
import OrderTimeTable from './OrderTimeTable.vue'
import OrderTimeTableRow from './OrderTimeTableRow.vue'

const state = useStore()
</script>

<template>
  <order-time-table
    bar-start="myBeginDate"
    bar-end="myEndDate"
  >
    <order-time-table-row
      v-for="order in state.orders.sortedOrders"
      :order="order"
      :key="order.order_no"
    />
  </order-time-table>
</template>
