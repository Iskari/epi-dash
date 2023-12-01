import { computed } from 'vue'

import dayjs from 'dayjs'
import provideConfig from '../provider/provideConfig'

export default function useTimeaxisUnits(config = provideConfig()) {
  const { chartStart, chartEnd } = config

  const timeaxisUnits = computed(() => {
    const upperUnits: { label: string; value?: string; date: Date; width?: number }[] = []
    const lowerUnits: { label: string; value?: string; date: Date; width?: number }[] = []

    const completeWidth = dayjs(chartStart.value).diff(chartEnd.value, 'minutes')
    for (let i = 0; i < 11; i++) {
      const labelDay = dayjs(chartStart.value).add(i, 'day')

      upperUnits.push({
        label: labelDay.format('DD.MMM'),
        value: 'day',
        date: labelDay.toDate(),
        width: (completeWidth / 1440) * 100
      })
    }

    for (let i = 0; i < 22; i++) {
      const labelHour = dayjs(chartStart.value).add(i * 12, 'hour')

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
