import { computed } from 'vue'

import dayjs from 'dayjs'
import { useStore } from '../stores/global'

export default function useTimePositionMapping(state = useStore()) {
  const totalNumOfMinutes = computed(() => {
    return dayjs(state.config.end).diff(state.config.start, 'minutes')
  })

  const mapTimeToPosition = (time: Date | null): number => {
    const width = state.chart.size.width || 0
    const diffFromStart = dayjs(time).diff(state.config.start, 'minutes')
    const result = Math.ceil((diffFromStart / totalNumOfMinutes.value) * width)
    return result
  }

  return {
    mapTimeToPosition
  }
}
