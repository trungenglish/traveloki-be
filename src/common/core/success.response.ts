'use strict';

import { Response } from 'express';
import { StatusCodes, ReasonPhrases } from "@/utils/httpStatusCode";
import { ICreated, IOK, ISuccessResponse } from "../interfaces";

class SuccessResponse {
  message: string;
  status: number;
  metadata: object;

  constructor({
    message,
    status = StatusCodes.OK,
    reasonStatusCode = ReasonPhrases.OK,
    metadata = {}
  }: ISuccessResponse) {
    this.message = message ?? reasonStatusCode,
    this.status = status
    this.metadata = metadata
  }
  send(res: Response, _headers: object = {}){
    return res.status( this.status ).json( this )
  }
}

class OK extends SuccessResponse {
  constructor ({ message, metadata }: IOK){
    super({ message, metadata })
  }
}

class CREATED extends SuccessResponse {
  option: object;

  constructor ({
    message,
    status = StatusCodes.CREATED,
    reasonStatusCode = ReasonPhrases.CREATED,
    metadata,
    option = {}
  }: ICreated){
    super({ message, status, reasonStatusCode, metadata })
    this.option = option
  }
}

export {
  OK, CREATED, SuccessResponse
}
