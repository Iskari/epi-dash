<template>
  <div
    class="w-full h-full top-0 left-0 justify-between flex divide-x-2 divide-dashed dark:divide-x absolute"
  >
    <div
      v-for="{ label, width } in timeaxisUnits.lowerUnits"
      :key="label"
      class="flex-1"
      :style="{
        width
      }"
    >
      &nbsp;
    </div>
  </div>
  <div
    class="bg-red-500 w-0.5 h-full absolute z-40"
    :style="{
      left: `${timeOffset}px`
    }"
  ></div>
</template>

<script setup lang="ts">
import useTimeaxisUnits from '../composables/useTimeaxisUnits'
import useTimePositionMapping from '../composables/useTimePositionMapping'
import { ref } from 'vue'
import { useStore } from '../stores/global'

const store = useStore()
const { timeaxisUnits } = useTimeaxisUnits()
const { mapTimeToPosition } = useTimePositionMapping()

const timeOffset = ref(0)

function updatePosition() {
  timeOffset.value = mapTimeToPosition(new Date())
}

updatePosition()
setInterval(updatePosition, store.config.updateInterval)
</script>
