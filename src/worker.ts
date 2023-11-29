import axios from 'axios'
import moment from 'moment'
import Order from './models/order'

const URL = 'http://192.168.1.20:3000'
const ISO_DATE_FORMAT = 'YYYY-MM-DD'
const api = axios.create({
  baseURL: URL
})
api.defaults.headers.common['accept'] = 'application/json'
api.defaults.headers.common['X-EPI-NO-SESSION'] = 'True'
api.defaults.headers.common['X-EPI-ACC-TOK'] = 'E27E013A55554D4BB45476FEBFB05C2B'
api.defaults.headers.post['Content-Type'] = 'application/json'

//const lastUpdate = moment().subtract(1, 'y')

async function fetchOrders() {
  api
    .get('/v1/order/filter', {
      params: {
        cl: 0, // Select Mandant
        ia: false, // is archived
        icv: true, // is current version
        dtt: 0, // Select Dispo as start date for filter
        ds: moment().subtract(3, 'd').format(ISO_DATE_FORMAT), // Filter start date to yesterday
        de: moment().add(12, 'd').format(ISO_DATE_FORMAT) // Filter end date to 10 days from now
      },
      headers: {
        //'If-Modified-Since': moment(lastUpdate).format("ddd, DD MMM YYYY HH:mm:ss GMT"), // Cannot use since required headers not whitelisted
      }
    })
    .then(parseOrders)
    .catch((error) => {
      self.postMessage({
        type: 'error',
        message: `Got HTTP error when fetching orders`,
        error: error
      })
    })
}

function parseOrders(apiResponse) {
  if (apiResponse.data.success) {
    for (const orderData of apiResponse.data.payload) {
      try {
        const order = new Order(orderData)
        // TODO: Filter Orders
        self.postMessage({
          type: 'addOrCreateOrder',
          order: order.dehydrate()
        })
      } catch (e) {
        self.postMessage({
          type: 'error',
          message: `Could not parse Order`,
          error: e
        })
      }
    }
  } else {
    self.postMessage({
      type: 'error',
      message: `Got API error when fetching orders`,
      error: apiResponse
    })
  }
}

// Fetch Orders every 5 seconds
setInterval(fetchOrders, 5000)

self.onmessage = function () {
  fetchOrders()
}
