import { NextFunction, Request, Response, RequestHandler } from 'express'

export const asyncHandler = (func: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch(next)
  }
}
