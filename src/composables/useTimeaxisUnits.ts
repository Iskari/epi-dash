import { computed } from 'vue'

import moment from 'moment'

export default function useTimeaxisUnits() {
  const chartStartMoment = moment().startOf('day').subtract(2, 'day')
  const chartEndMoment = moment().startOf('day').add(10, 'day')

  const timeaxisUnits = computed(() => {
    const upperUnits: { label: string; value?: string; date: Date; width?: string }[] = []
    const lowerUnits: { label: string; value?: string; date: Date; width?: string }[] = []

    const completeWidth = chartStartMoment.diff(chartEndMoment, 'minutes')
    for (let i = 0; i < 10; i++) {
      const labelMoment = chartStartMoment.add(1, 'day')

      upperUnits.push({
        label: labelMoment.format('DD.MMM'),
        value: 'day',
        date: labelMoment,
        width: (completeWidth / 1440) * 100
      })
    }

    for (let i = 0; i < 20; i++) {
      const labelMoment = chartStartMoment.add(12, 'hour')

      lowerUnits.push({
        label: labelMoment.format('HH'),
        value: 'hour',
        date: labelMoment,
        width: (completeWidth / 720) * 100
      })
    }

    return { upperUnits, lowerUnits }
  })

  return {
    timeaxisUnits
  }
}
