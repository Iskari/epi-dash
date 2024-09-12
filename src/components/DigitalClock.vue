<template>
  <div class="dark:text-white">
    {{ datetime }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'

let datetime = ref('')

let timerID = setInterval(updateTime, 1000)

updateTime()

function updateTime() {
  datetime.value = dayjs().format('dd DD.MM.YY HH:mm:ss')
}
</script>
