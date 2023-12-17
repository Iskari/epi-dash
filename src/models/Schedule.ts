import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import ScheduleType from './ScheduleType'
import { mapToScheduleType } from './ScheduleType'
import { useStore as useConfigStore } from '../stores/config'

dayjs.extend(isBetween)

export default class Schedule {
  start: Date
  end: Date
  type: ScheduleType

  constructor(payload: any = {}) {
    this.start = dayjs(payload.date_start).add(payload.time_start, 's').toDate()
    this.end = dayjs(payload.date_end).add(payload.time_end, 's').toDate()
    this.type = mapToScheduleType(payload.type)
  }

  static restore(scheduleData: Schedule) {
    const schedule = Object.assign(new Schedule(), scheduleData)
    return schedule
  }

  get has_edge_in_chart_range(): boolean {
    const configStore = useConfigStore()
    return (
      dayjs(this.start).isBetween(configStore.start, configStore.end) ||
      dayjs(this.end).isBetween(configStore.start, configStore.end)
    )
  }
}