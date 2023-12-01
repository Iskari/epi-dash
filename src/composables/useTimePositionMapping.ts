import { computed } from 'vue'

import dayjs from 'dayjs'
import provideConfig from '../provider/provideConfig.js'

export default function useTimePositionMapping(config = provideConfig()) {
  const { chartSize, chartStart, chartEnd } = config

  const totalNumOfMinutes = computed(() => {
    return dayjs(chartEnd.value).diff(chartStart.value, 'minutes')
  })

  const mapTimeToPosition = (time: Date | null): number => {
    const width = chartSize.width.value || 0
    const diffFromStart = dayjs(time).diff(chartStart.value, 'minutes')
    return Math.ceil((diffFromStart / totalNumOfMinutes.value) * width)
  }

  return {
    mapTimeToPosition
  }
}
