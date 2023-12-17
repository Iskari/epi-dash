import axios from 'axios'
import dayjs from 'dayjs'
import Order from './models/Order'

const ISO_DATE_FORMAT = 'YYYY-MM-DD'
const api = axios.create()
let fetchOrderLoop = 0
let startDateModifier = 0
let endDateModifier = 0
let baseUrl = ''

api.defaults.headers.common['accept'] = 'application/json'
api.defaults.headers.common['X-EPI-NO-SESSION'] = 'True'
api.defaults.headers.post['Content-Type'] = 'application/json'

async function fetchOrders() {
  api
    .get(`${baseUrl}/v1/order/filter`, {
      params: {
        cl: 0, // Select Mandant
        ia: false, // is archived
        icv: true // is current version
      }
    })
    .then(parseOrders)
    .catch((error) => {
      self.postMessage({
        type: 'error',
        message: `Verbindungsfehler zum Epirent Server`,
        error: error.code
      })
    })
}

function parseOrders(apiResponse: any) {
  const startDate = dayjs().startOf('day').subtract(startDateModifier, 'day').toDate()
  const endDate = dayjs().startOf('day').add(endDateModifier, 'day').toDate()
  if (apiResponse.data.success) {
    for (const orderData of apiResponse.data.payload) {
      try {
        const order = new Order(orderData)
        const isInRange = order.schedules.find((schedule) => {
          return startDate < schedule.end && schedule.start < endDate
        })
        if (isInRange) {
          self.postMessage({
            type: 'addOrUpdateOrder',
            order: order
          })
        }
      } catch (e) {
        self.postMessage({
          type: 'error',
          message: `Der Epirent Server hat mit inkorrekten Daten geantwortet`,
          error: e
        })
      }
    }
  } else {
    self.postMessage({
      type: 'error',
      message: `Der Epirent Server hat die Verbingun abgewiesen (ist der Api Schlüssel falsch?)`,
      error: apiResponse
    })
  }
}

function handleCommand(data: any) {
  switch (data.command) {
    case 'start':
      console.info('Starting background order fetching')
      startDateModifier = data.config.startDateModifier
      endDateModifier = data.config.endDateModifier
      baseUrl = data.config.api.baseUrl
      api.defaults.headers.common['X-EPI-ACC-TOK'] = data.config.api.key
      fetchOrderLoop = setInterval(fetchOrders, data.config.updateInterval)
      break
    case 'pause':
      console.info('Halting background order fetching')
      clearInterval(fetchOrderLoop)
      break
    default:
      self.postMessage({
        type: 'error',
        message: `Unknown Command Type`,
        error: null
      })
  }
}

self.onmessage = function (message: any) {
  switch (message.data.type) {
    case 'command':
      handleCommand(message.data.data)
      break
    default:
      self.postMessage({
        type: 'error',
        message: `Unknown Message Type`,
        error: null
      })
  }
}
