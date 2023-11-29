<template>
  <div class="border-b-2">
    <div class="flex divide-x">
      <div
        v-for="{ label, width } in timeaxisUnits.upperUnits"
        :key="label"
        class="flex-1 text-center"
        :style="{
          'flex-basis': width
        }"
      >
        {{ label }}
      </div>
    </div>

    <div class="flex divide-x">
      <div
        v-for="{ label, width } in timeaxisUnits.lowerUnits"
        :key="label"
        class="flex-1 text-center"
        :style="{
          'flex-basis': width
        }"
      >
        &nbsp;
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useTimeaxisUnits from '../composables/useTimeaxisUnits.js'

const { timeaxisUnits } = useTimeaxisUnits()
</script>
