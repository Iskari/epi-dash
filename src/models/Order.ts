import Customer from './Customer'
import TimeSpan from './TimeSpan'

const SCHEDULE_DISPO_TYPE = 1
const SCHEDULE_EVENT_TYPE = 7

export default class Order {
  order_no: int
  order_no_formatted: string
  name: string
  dispo: TimeSpan
  event: TimeSpan
  is_self_pickup: bool
  customer: Customer

  constructor(payload: any) {
    if (payload) {
      this.order_no = payload.order_no || -1
      this.order_no_formatted = payload.order_no_fmt || 'Unknown'
      this.name = payload.event || 'Unknown'
      this.is_self_pickup = payload.is_self_pickup
      this.customer = new Customer(payload.contact)

      const dispo_schedule = payload.order_schedule.find((el) => el.type == SCHEDULE_DISPO_TYPE)
      this.dispo = dispo_schedule ? new TimeSpan(dispo_schedule) : null

      const event_schedule = payload.order_schedule.find((el) => el.type == SCHEDULE_EVENT_TYPE)
      this.event = event_schedule ? new TimeSpan(event_schedule) : null
    }
  }

  /**
   * Convert this object to an annotated json string.
   * The ClassType is saved in the __type property on each object
   */
  dehydrate(): string {
    return JSON.stringify(this, (key: string, value: string): Object => {
      if (value && typeof value === 'object') {
        value.__type = value.constructor.name
      }
      return value
    })
  }

  /**
   * Create an Order object from its annotated json string.
   */
  static rehydrate(jsonString: string): Order {
    const classes = {
      Customer,
      Object,
      Order,
      TimeSpan
    }

    return JSON.parse(jsonString, (key: string, value: string) => {
      if (value && typeof value === 'object' && value.__type) {
        const DynamicClass = classes[value.__type]
        if (DynamicClass.rehydrate && DynamicClass !== Order) {
          value = DynamicClass.rehydrate(value)
        } else {
          value = Object.assign(new DynamicClass(), value)
        }
        delete value.__type
      }
      return value
    })
  }
}
