import Customer from './Customer'
import TimeSpan from './TimeSpan'

const SCHEDULE_DISPO_TYPE = 1
const SCHEDULE_EVENT_TYPE = 7

export default class Order {
  order_no: number
  order_no_formatted: string
  name: string
  dispo: TimeSpan
  event: TimeSpan
  is_self_pickup: boolean
  customer: Customer | null


  constructor(payload: any) {
	this.order_no = payload.order_no || -1
	this.order_no_formatted = payload.order_no_fmt || 'Unknown'
	this.name = payload.event || 'Unknown'
	this.is_self_pickup = payload.is_self_pickup
	this.customer = new Customer(payload.contact)

	const dispo_schedule = payload.order_schedule.find((el: any) => el.type == SCHEDULE_DISPO_TYPE)
	this.dispo =  new TimeSpan(dispo_schedule)

	const event_schedule = payload.order_schedule.find((el: any) => el.type == SCHEDULE_EVENT_TYPE)
	this.event =  new TimeSpan(event_schedule) 
  }
}