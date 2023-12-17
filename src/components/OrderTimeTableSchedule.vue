<template>
  <div
    class="flex overflow-hidden rounded items-center z-20"
    :class="{
      'bg-sky-400': props.schedule.type == ScheduleType.Dispo,
      'bg-green-400': props.schedule.type == ScheduleType.Event,
      'bg-purple-400': props.schedule.type == ScheduleType.Sale,
      'bg-red-400': props.schedule.type == ScheduleType.Unknown
    }"
    :style="{
      position: 'absolute',
      top: `${store.chart.rowHeight * 0.1}px`,
      left: `${xStart}px`,
      width: `${xEnd - xStart}px`,
      height: `${store.chart.rowHeight * 0.8}px`
    }"
  >
    <div class="w-full h-full box-border flex items-center m-1"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

import useTimePositionMapping from '../composables/useTimePositionMapping.js'
import { useStore } from '../stores/global'
import Order from '../models/Order'
import Schedule from '../models/Schedule'
import ScheduleType from '../models/ScheduleType'

const store = useStore()
const { mapTimeToPosition } = useTimePositionMapping()

const props = defineProps<{
  schedule: Schedule
}>()

const xStart = ref(0)
const xEnd = ref(0)

onMounted(() => {
  watch(
    [props.schedule, store.chart.size.width, store.chart.size.height],
    () => {
      xStart.value = mapTimeToPosition(props.schedule.start)
      xEnd.value = mapTimeToPosition(props.schedule.end)
    },
    { deep: true, immediate: true }
  )
})
</script>
