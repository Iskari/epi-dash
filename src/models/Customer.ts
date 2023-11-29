export default class Customer {
  customer_no: int
  name: string

  constructor(payload: any) {
    if (payload) {
      this.customer_no = payload.customer_no || -1
      this.name = payload.name || 'Unknown'
    }
  }
}
