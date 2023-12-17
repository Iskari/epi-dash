import Customer from './Customer'
import Schedule from './Schedule'
import ScheduleType from './ScheduleType'

const SCHEDULE_DISPO_TYPE = 1
const SCHEDULE_EVENT_TYPE = 7

export default class Order {
  order_no: number
  order_no_formatted: string
  name: string
  schedules: Schedule[]
  is_self_pickup: boolean
  is_sale: boolean
  is_rent: boolean
  customer: Customer

  constructor(payload: any) {
    this.is_sale = payload.is_sale
    this.is_rent = payload.is_rent
    this.order_no = payload.order_no || -1
    this.order_no_formatted = payload.order_no_fmt || 'Unknown'
    this.name = payload.event || 'Unknown'
    this.is_self_pickup = payload.is_self_pickup
    this.customer = new Customer(payload.contact)
    this.schedules = []

    if (this.is_sale) {
      const sale_shedule = {
        date_start: payload.date_delivery,
        time_start: 0,
        date_end: payload.date_delivery,
        time_end: 60 * 60 * 24 - 1,
        type: -1
      }
      if (!sale_shedule) {
        throw new Error('No Sales schedule on Sales Event')
      }
      this.schedules.push(new Schedule(sale_shedule))
    }

    if (this.is_rent) {
      const dispo_schedule = payload.order_schedule.find(
        (el: any) => el.type == SCHEDULE_DISPO_TYPE
      )
      const event_schedule = payload.order_schedule.find(
        (el: any) => el.type == SCHEDULE_EVENT_TYPE
      )

      if (!dispo_schedule) {
        throw new Error('No Dispo schedule on Event')
      }
      if (!event_schedule) {
        throw new Error('No Event schedule on Event')
      }
      this.schedules.push(new Schedule(dispo_schedule))
      this.schedules.push(new Schedule(event_schedule))
    }
  }

  static restore(orderData: Order) {
    const order = Object.assign(new Order({ is_sale: false, is_rent: false }), orderData)
    order.schedules = order.schedules.map((schedule) => Schedule.restore(schedule))
    order.customer = Customer.restore(order.customer)
    return order
  }

  public get has_schedules(): boolean {
    return this.schedules.length < 0
  }

  public get has_edge_in_chart_range(): boolean {
    return (
      this.schedules.filter((schedule) => {
        return schedule.has_edge_in_chart_range
      }).length > 0
    )
  }

  public firstScheduleOfType(type: ScheduleType): Schedule | undefined {
    return this.schedules.find((schedule) => schedule.type == type)
  }

  public is_after(other: Order, compareType: ScheduleType): boolean {
    const this_schedule = this.firstScheduleOfType(compareType)
    const other_schedule = other.firstScheduleOfType(compareType)
    const this_schedule_end = (this_schedule) ? this_schedule.end : 0
    const other_schedule_end = (other_schedule) ? other_schedule.end : 0
    return this_schedule_end > other_schedule_end
  }

  public has_passed() : boolean {
    const schedule = this.firstScheduleOfType(ScheduleType.Event)
    return (schedule) ? schedule.end < new Date () : false
  }
}
