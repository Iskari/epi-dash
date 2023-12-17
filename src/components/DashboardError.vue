<script setup lang="ts">
import { useStore } from '../stores/global'

const state = useStore()
</script>

<template>
  <div class="container mx-auto">
    <div class="grid place-content-center px-4">
      <div class="text-center flex flex-col">
        <h1 class="text-9xl font-black text-gray-200 dark:text-gray-700">Uh-oh!</h1>

        <p class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Wir haben einen Fehler
        </p>

        <p class="mt-4 text-gray-500 dark:text-gray-400">{{ state.errorMessage }}</p>

        <RouterLink
          to="/settings"
          class="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Öffne die Einstellungen
        </RouterLink>

        <p class="mt-4 text-gray-500 dark:text-gray-400">oder</p>

        <a
          href="./"
          class="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Lade die Seite neu
        </a>
      </div>
    </div>
  </div>
</template>
