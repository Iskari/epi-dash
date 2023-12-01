<template>
  <div class="overflow-hidden h-10 relative w-screen">
    <div
      class="absolute top-0 left-0 p-1 text-xs z-20 bg-gradient-to-r from-slate-200 dark:text-white dark:from-black flex flex-col"
      :class="{
        'bg-red-500': props.order.has_error
      }"
    >
      <div class="inline-flex">
        <b class="self-center">{{ order.order_no_formatted }}</b>
        <delivery-truck class="self-center w-5 h-5 mx-1" v-if="order.is_self_pickup" />
      </div>
      <span class="mx-0">
        {{ order.name }}
      </span>
    </div>
    <div class="w-screen relative">
      <order-time-table-schedule
        :order="props.order"
        :time-span="props.order.dispo"
        schedule-type="dispo"
      />
      <order-time-table-schedule
        :order="props.order"
        :time-span="props.order.event"
        schedule-type="event"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderTimeTableSchedule from './OrderTimeTableSchedule.vue'
import Order from '../models/Order'
import { DeliveryTruck } from '@iconoir/vue'

const props = defineProps<{
  order: Order
}>()
</script>
