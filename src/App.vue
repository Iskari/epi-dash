<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import DigitalClock from './components/DigitalClock.vue'
import { DashboardSpeed, ControlSlider, SunLight, HalfMoon, IconoirProvider } from '@iconoir/vue'
import LogoDark from './assets/logo-darkmode.png'
import LogoLight from './assets/logo-lightmode.png'
import { useStore } from './stores/global'

const state = useStore()
const navOpen = ref(false)
</script>

<template>
  <div
    :class="{ dark: state.theme.darkMode, 'bg-gray-900': state.theme.darkMode }"
    class="bg-gray-50 h-screen flex flex-col"
  >
    <header>
      <nav>
        <div class="flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://avivox.ch/" class="flex items-center p-2">
            <img
              :src="state.theme.darkMode ? LogoDark : LogoLight"
              alt="Avivox Logo"
              class="h-8 mr-3"
            />
          </a>
          <digital-clock />
          <button
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            :aria-expanded="navOpen"
            @click="navOpen = !navOpen"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            :class="{
              hidden: !navOpen
            }"
            class="w-full md:block md:w-auto"
            id="navbar-default"
          >
            <ul
              class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0"
            >
              <li>
                <RouterLink
                  to="/"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:text-blue-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-gray-400"
                  aria-current="page"
                >
                  <div class="flex w-full">
                    <DashboardSpeed />
                    <span class="w-full md:hidden flex-1 pl-2">Dashboard</span>
                  </div>
                </RouterLink>
              </li>
              <li>
                <button
                  @click="state.theme.toggleDarkMode()"
                  class="w-full block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:text-blue-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-gray-400"
                >
                  <div class="flex w-full">
                    <SunLight v-if="state.theme.darkMode" />
                    <HalfMoon v-else />
                    <span class="w-full md:hidden flex-1 text-left pl-2">
                      {{
                        state.theme.darkMode
                          ? 'Helle Darstellung aktivieren'
                          : 'Dunkle Darstellung aktivieren'
                      }}
                    </span>
                  </div>
                </button>
              </li>
              <li>
                <RouterLink
                  to="/settings"
                  class="w-full block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:text-blue-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-gray-400"
                >
                  <div class="flex w-full">
                    <ControlSlider />
                    <span class="w-full md:hidden flex-1 pl-2">Einstellungen</span>
                  </div>
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.router-link-active {
  @apply md:text-blue-600 bg-blue-600 md:bg-transparent text-white;
}
</style>
