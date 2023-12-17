<template>
  <div ref="chart" class="h-full flex flex-col">
    <time-table-timeaxis />
    <div class="relative flex-1">
      <time-table-grid />
      <div class="divide-y-2 divide-dashed">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '../stores/global'

import TimeTableTimeaxis from './TimeTableTimeaxis.vue'
import TimeTableGrid from './TimeTableGrid.vue'

import { useElementSize } from '@vueuse/core'

const store = useStore()
const chart = ref<HTMLElement | null>(null)

store.chart.setChartDimensions(chart)
</script>
