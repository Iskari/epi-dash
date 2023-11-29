<template>
  <div class="w-full h-full top-0 left-0 justify-between flex divide-x divide-dashed absolute">
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
    class="bg-red-500 w-px h-full absolute z-10"
    :style="{
      left: `${timeOffset}px`
    }"
  ></div>
</template>

<script setup lang="ts">
import useTimeaxisUnits from '../composables/useTimeaxisUnits'
import useTimePositionMapping from '../composables/useTimePositionMapping'
import moment from 'moment'
import { ref } from 'vue'

const { timeaxisUnits } = useTimeaxisUnits()
const { mapTimeToPosition } = useTimePositionMapping()

const timeOffset = ref(0)

const updatePosition = () => {
  timeOffset.value = mapTimeToPosition(moment())
}

setInterval(updatePosition, 5000)
updatePosition()
</script>
