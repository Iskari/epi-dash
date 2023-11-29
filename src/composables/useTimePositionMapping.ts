import type { GGanttChartConfig } from '../components/GGanttChart.vue'
import { computed } from 'vue'

import moment from 'moment'
import provideConfig from '../provider/provideConfig.js'

export default function useTimePositionMapping(config: GGanttChartConfig = provideConfig()) {
  const { chartSize } = config
  const chartStartMoment = moment().startOf('day').subtract(1, 'day')
  const chartEndMoment = moment().startOf('day').add(10, 'day')

  const totalNumOfMinutes = computed(() => {
    return chartEndMoment.diff(chartStartMoment, 'minutes')
  })

  const mapTimeToPosition = (time: moment) => {
    const width = chartSize.width.value || 0
    const diffFromStart = time.diff(chartStartMoment, 'minutes')
    return Math.ceil((diffFromStart / totalNumOfMinutes.value) * width)
  }

  return {
    mapTimeToPosition
  }
}
