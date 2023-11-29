<template>
  <div class="overflow-hidden h-10 relative w-screen">
    <div
      class="absolute top-0 left-0 p-1 flex flex-col text-xs z-20 bg-gradient-to-r from-slate-200"
    >
      <b>{{ order.order_no_formatted }}</b>
      {{ order.name }}
    </div>
    <div class="w-screen relative" v-bind="$attrs">
      <order-time-table-schedule :order="props.order" :time-span="props.order.dispo" schedule-type="dispo" />
      <order-time-table-schedule :order="props.order" :time-span="props.order.event" schedule-type="event" />
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderTimeTableSchedule from './OrderTimeTableSchedule.vue'
import Order from '../models/Order'

const props = defineProps<{
  order: Order
}>()

console.log(props);
</script>
