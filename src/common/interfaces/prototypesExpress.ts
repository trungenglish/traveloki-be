import { Request, Response, NextFunction } from 'express'

export interface prototypesExpress {
  req: Request
  res: Response
  next: NextFunction
}
