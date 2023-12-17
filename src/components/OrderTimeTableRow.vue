<template>
  <div class="overflow-hidden h-10 relative w-screen">
    <div
      class="absolute top-0 left-0 p-1 text-xs bg-gradient-to-r from-slate-200 dark:text-white dark:from-gray-900 flex z-30"
    >
      <delivery-truck class="self-center w-5 h-5 mx-1" v-if="props.order.is_self_pickup" />
      <select-face-3d class="self-center w-5 h-5 mx-1" v-else-if="props.order.is_sale" />
      <clock-rotate-right class="self-center w-5 h-5 mx-1" v-else />
      <div class="inline-flex flex-col">
        <b>{{ props.order.order_no_formatted }}</b>
        <span>{{ props.order.customer.name }} | {{ props.order.name }}</span>
      </div>
    </div>
    <div class="w-screen relative">
      <order-time-table-schedule
        v-for="schedule in order.schedules"
        :key="schedule.type"
        :schedule="schedule"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderTimeTableSchedule from './OrderTimeTableSchedule.vue'
import Order from '../models/Order'
import { DeliveryTruck, ClockRotateRight, SelectFace3d } from '@iconoir/vue'

const props = defineProps<{
  order: Order
}>()
</script>
