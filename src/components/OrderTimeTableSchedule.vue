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
    <div class="w-full h-full box-border flex items-center m-1">
      <div>
        {{ props.scheduleType == 'dispo' ? 'D' : 'E' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

import useTimePositionMapping from '../composables/useTimePositionMapping.js'
import provideConfig from '../provider/provideConfig.js'
import Order from '../models/Order'
import TimeSpan from '../models/TimeSpan'

const props = defineProps<{
  order: Order,
  timeSpan: TimeSpan,
  scheduleType: string
}>()

const config = provideConfig()
const { rowHeight } = config

const { mapTimeToPosition } = useTimePositionMapping()

const { chartStart, chartEnd, chartSize } = config

const xStart = ref(0)
const xEnd = ref(0)

onMounted(() => {
  watch(
    [props.timeSpan.start, props.timeSpan.end, chartStart, chartEnd, chartSize.width],
    () => {
      ;(xStart.value = mapTimeToPosition(props.timeSpan.start)),
        (xEnd.value = mapTimeToPosition(props.timeSpan.end))
    },
    { deep: true, immediate: true }
  )
})
</script>
