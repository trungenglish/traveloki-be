import { Response } from 'express'

export interface OkResponse {
  message: string
  res: Response
  headers: object
  metadata: object
}
