import { Request } from 'express'

export interface IHandlerRefreshToken extends Request {
  refreshToken: string
  user: object
  keyStore: string
}
