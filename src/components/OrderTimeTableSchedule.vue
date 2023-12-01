<template>
  <div
    class="flex overflow-hidden rounded items-center"
    :class="{
      'bg-orange-300': props.scheduleType == 'dispo',
      'bg-lime-300': props.scheduleType == 'event'
    }"
    :style="{
      position: 'absolute',
      top: `${rowHeight * 0.1}px`,
      left: `${xStart}px`,
      width: `${xEnd - xStart}px`,
      height: `${rowHeight * 0.8}px`
    }"
  >
    <div class="w-full h-full box-border flex items-center m-1"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

import useTimePositionMapping from '../composables/useTimePositionMapping.js'
import provideConfig from '../provider/provideConfig.js'
import Order from '../models/Order'
import TimeSpan from '../models/TimeSpan'

const props = defineProps<{
  order: Order
  timeSpan: TimeSpan | null
  scheduleType: string
}>()

const config = provideConfig()
const { rowHeight } = config

const { mapTimeToPosition } = useTimePositionMapping()

const { chartStart, chartEnd, chartSize } = config

const xStart = ref(0)
const xEnd = ref(0)

onMounted(() => {
  if(props.order.has_error === false) {
    watch(
      [props.order, chartStart, chartEnd, chartSize.width],
      () => {
        if(props.timeSpan !== null) {
          ;(xStart.value = mapTimeToPosition(props.timeSpan.start)),
          (xEnd.value = mapTimeToPosition(props.timeSpan.end))
        } 
      },
      { deep: true, immediate: true }
    )
  }
})
</script>
