import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import compression from 'compression'

import { connection } from '@/config'
import { router } from '@/routes'
import { PORT_CLIENT } from '@/env'

dotenv.config()

const app = express()
const port = Number(process.env.PORT) || 10000
const isProduction = process.env.NODE_ENV === 'production'
const host = isProduction ? '0.0.0.0' : 'localhost'

const corsOptions: CorsOptions = {
  origin: [`http://localhost:${PORT_CLIENT}`],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}

app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(compression())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('', router)

app.get('/req', (req: Request) => {
  return req.body
})

app.get('/res', (res: Response) => {
  res.send('Hello World!')
})

app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong 🏓')
})
;(async () => {
  try {
    await connection()
    app.listen(port, host, () => {
      console.log(`Backend traveloki app listening on port ${port}`)
    })
  } catch (error) {
    console.log('>>> Error connect to db: ', error)
  }
})()
