import dayjs from 'dayjs'

export default class TimeSpan {
  start: Date
  end: Date

  constructor(payload: any) {
  	this.start = dayjs(payload.date_start).add(payload.time_start, 's').toDate()
  	this.end = dayjs(payload.date_end).add(payload.time_end, 's').toDate()
  }
}
