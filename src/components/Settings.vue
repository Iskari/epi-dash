<script setup lang="ts">
import { useStore } from '../stores/global'
import { Square, XmarkSquareSolid, InfoCircle } from '@iconoir/vue'

const state = useStore()
</script>

<template>
  <div class="container mx-auto flex flex-col divide-y-2">
    <span class="text-2xl text-semibold dark:text-white p-4">Dashboard Einstellungen</span>
    <div class="flex justify-between p-4">
      <div class="dark:text-white">Zeige Verkaufselemente an</div>
      <div @click="state.config.toggleSaleElements">
        <XmarkSquareSolid v-if="state.config.showSaleElements" class="dark:text-white" />
        <square v-else class="dark:text-white" />
      </div>
    </div>
    <div class="flex justify-between p-4">
      <div class="dark:text-white">Sortiere nach Eventenddatum und nicht nach Disposition</div>
      <div @click="state.config.toggleSortByType">
        <XmarkSquareSolid v-if="state.config.sortByType == 'dispo'" class="dark:text-white" />
        <square v-else class="dark:text-white" />
      </div>
    </div>
    <span class="text-2xl text-semibold dark:text-white p-4">Epirent Einstellungen</span>
    <div class="flex justify-between p-4">
      <div class="dark:text-white m-2">Epirent Url</div>
      <div class="w-96">
        <input
          type="text"
          v-model="state.config.api.baseUrl"
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </div>
    <div class="flex justify-between p-4">
      <div class="dark:text-white m-2">Epirent Api Schlüssel</div>
      <div class="w-96">
        <input
          type="text"
          v-model="state.config.api.key"
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </div>
  </div>
</template>
