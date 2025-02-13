import { Request } from 'express'

export interface IRequestLogout extends Request {
  keyStore: string
}

export interface IRequestHandlerRefreshToken extends Request {
  refreshToken: string
  user: string
  keyStore: string
}
