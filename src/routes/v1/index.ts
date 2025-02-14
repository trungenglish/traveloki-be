import express from 'express'
export const routerV1 = express.Router()

import { v1 } from '@/common/constants'

import { routerApiKey } from '@/modules/apiKey/routes'
// import { routerAccount } from '@/modules/account/routes'
import { routerKeyToken } from '@/modules/keyToken/routes'
import { routerAirport } from '@/modules/airport/routes'
import { routerPayment } from '@/modules/payment/routes'
import { routerHistoryBooking } from '@/modules/historyBooking/routes'

routerV1.use(v1, routerApiKey)
// routerV1.use(v1, routerAccount)
routerV1.use(v1, routerKeyToken)
routerV1.use(v1, routerAirport)
routerV1.use(v1, routerHistoryBooking)
routerV1.use(v1, routerPayment)
