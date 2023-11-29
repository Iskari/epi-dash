<template>
  <div class="overflow-hidden h-10 relative w-screen">
    <div
      class="absolute top-0 left-0 p-1 flex flex-col text-xs z-20 bg-gradient-to-r from-slate-200"
    >
      <b>{{ order.order_no_formatted }}</b>
      {{ order.name }}
    </div>
    <div class="w-screen relative" v-bind="$attrs">
      <order-time-table-schedule :order="props.order" schedule="dispo" />
      <order-time-table-schedule :order="props.order" schedule="event" />
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderTimeTableSchedule from './OrderTimeTableSchedule.vue'
import Order from '../models/order'

const props = defineProps<{
  order: Order
}>()
</script>
