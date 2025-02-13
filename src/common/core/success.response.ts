'use strict'

import { Response } from 'express'
import { StatusCodes, ReasonPhrases } from '@/utils/httpStatusCode'
import { CreatedResponse, ICreated, IOk, OkResponse } from '../interfaces'

interface ISuccessResponse {
  send(res: Response, headers: object): Response
}

class SuccessResponse implements ISuccessResponse {
  private message: string
  private status: number
  private metadata: object
  constructor({ message = ReasonPhrases.OK, status = StatusCodes.OK, metadata = {} }) {
    this.message = message || ReasonPhrases.OK
    this.status = status
    this.metadata = metadata
  }

  send(res: Response, headers: object) {
    return res.status(this.status).set(headers).json(this)
  }
}

class Ok extends SuccessResponse {
  constructor({ message, metadata = {} }: IOk) {
    super({ message, metadata })
  }
}

class Created extends SuccessResponse {
  constructor({ message, metadata = {} }: ICreated) {
    super({ message, status: StatusCodes.CREATED, metadata })
  }
}

const OK = ({ res, message, metadata, headers = {} }: OkResponse) => {
  new Ok({
    message,
    metadata
  }).send(res, headers)
}

const CREATED = ({ res, message, metadata, headers = {} }: CreatedResponse) => {
  new Created({
    message,
    metadata
  }).send(res, headers)
}

export { OK, CREATED }
