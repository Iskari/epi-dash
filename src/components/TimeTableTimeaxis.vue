<template>
  <div class="border-b-2 dark:border-b sticky top-0 bg-gray-50 dark:bg-gray-900 z-50">
    <div class="flex divide-x-2 dark:divide-x">
      <div
        v-for="{ label, width } in timeaxisUnits.upperUnits"
        :key="label"
        class="flex-1 text-center dark:text-gray-400"
        :style="{
          'flex-basis': width
        }"
      >
        {{ label }}
      </div>
    </div>

    <div class="flex divide-x-2 dark:divide-x">
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
