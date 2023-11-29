import moment from 'moment'

export default class TimeSpan {
  start: Date
  end: Date
  start_formatted: string
  end_formatted: string

  constructor(payload: any) {
    if (payload) {
      this.start = moment(payload.date_start).add(payload.time_start, 's')
      this.end = moment(payload.date_end).add(payload.time_end, 's')
      this.start_formatted = this.start.format()
      this.end_formatted = this.end.format()
    }
  }

  static rehydrate(value) {
    const timespan = new TimeSpan()
    timespan.start = moment(value.start)
    timespan.end = moment(value.end)
    timespan.start_formatted = value.start_formatted
    timespan.end_formatted = value.end_formatted
    return timespan
  }
}
