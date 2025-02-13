'use strict'

import { StatusCodes, ReasonPhrases } from '@/utils/httpStatusCode'
import { IErrorResponse } from '../interfaces/responses'

const StatusCode = {
  FORBIDEN: 403,
  CONFLICT: 409
}

const ReasonStatusCode = {
  FORBIDEN: 'Bad request error',
  CONFLICT: 'Conflict error'
}

class ErrorResponse extends Error {
  status: number | undefined

  constructor({ message, status }: IErrorResponse) {
    super(message)
    this.status = status
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(message = ReasonStatusCode.CONFLICT, status = StatusCode.FORBIDEN) {
    super({ message, status })
  }
}

class BadRequestError extends ErrorResponse {
  constructor(message = ReasonStatusCode.CONFLICT, status = StatusCode.FORBIDEN) {
    super({ message, status })
  }
}

class AuthFailureError extends ErrorResponse {
  constructor(message = ReasonPhrases.UNAUTHORIZED, status = StatusCodes.UNAUTHORIZED) {
    super({ message, status })
  }
}

class NotFoundError extends ErrorResponse {
  constructor(message = ReasonPhrases.NOT_FOUND, status = StatusCodes.NOT_FOUND) {
    super({ message, status })
  }
}

class ForbidenError extends ErrorResponse {
  constructor(message = ReasonPhrases.FORBIDDEN, status = StatusCodes.FORBIDDEN) {
    super({ message, status })
  }
}

export { ConflictRequestError, BadRequestError, AuthFailureError, NotFoundError, ForbidenError }
