<template>
  <div ref="ganttChart" class="h-full flex flex-col">
    <time-table-timeaxis />
    <div class="relative flex-1">
      <time-table-grid />
      <div class="divide-y divide-dashed">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, toRefs } from 'vue'

import dayjs from 'dayjs'

import TimeTableTimeaxis from './TimeTableTimeaxis.vue'
import TimeTableGrid from './TimeTableGrid.vue'

import { useElementSize } from '@vueuse/core'
import { CONFIG_KEY } from '../provider/symbols.js'

export interface GGanttChartProps {
  dateFormat?: string | false
  rowHeight?: number
}

const props = withDefaults(defineProps<GGanttChartProps>(), {
  dateFormat: 'YYYY-MM-DD HH:mm',
  rowHeight: 40
})

const ganttChart = ref<HTMLElement | null>(null)
const chartSize = useElementSize(ganttChart)

provide(CONFIG_KEY, {
  ...toRefs(props),
  chartStart: ref(dayjs().startOf('day').subtract(1, 'day').toDate()),
  chartEnd: ref(dayjs().startOf('day').add(11, 'day').toDate()),
  chartSize
})
</script>
