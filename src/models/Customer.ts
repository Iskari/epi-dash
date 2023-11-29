export default class Customer {
  customer_no: number
  name: string

  constructor(payload: any) {
    this.customer_no = payload.customer_no || -1
    this.name = payload.name || 'Unknown'
  }
}
