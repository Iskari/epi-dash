import { computed } from 'vue'

import dayjs from 'dayjs'
import { useStore } from '../stores/global'

export default function useTimeaxisUnits(store = useStore()) {
  const timeaxisUnits = computed(() => {
    const upperUnits: { label: string; value?: string; date: Date; width?: number }[] = []
    const lowerUnits: { label: string; value?: string; date: Date; width?: number }[] = []

    const numOfDaysInChart = dayjs(store.config.end).diff(store.config.start, 'd')
    const completeWidth = dayjs(store.config.start).diff(store.config.end, 'minutes')

    for (let i = 0; i < numOfDaysInChart; i++) {
      const labelDay = dayjs(store.config.start).add(i, 'day')

      upperUnits.push({
        label: labelDay.format('dd DD.MMM'),
        value: 'day',
        date: labelDay.toDate(),
        width: (completeWidth / 1440) * 100
      })
    }

    for (let i = 0; i < numOfDaysInChart * 2; i++) {
      const labelHour = dayjs(store.config.start).add(i * 12, 'hour')

      lowerUnits.push({
        label: labelHour.format('HH'),
        value: 'hour',
        date: labelHour.toDate(),
        width: (completeWidth / 720) * 100
      })
    }

    return { upperUnits, lowerUnits }
  })

  return {
    timeaxisUnits
  }
}
