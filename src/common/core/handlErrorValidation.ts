import yup, { AnyObject, Maybe } from 'yup'

import { prototypesExpress } from '../interfaces'

interface ValidatorHandler extends prototypesExpress {
  schema: yup.ObjectSchema<Maybe<AnyObject>>
}

export const validatorHandler: ({ req, res, next, schema }: ValidatorHandler) => Promise<void> = async ({
  req,
  res,
  next,
  schema
}: ValidatorHandler) => {
  try {
    await schema.validate(req.body)
    next()
  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      res.status(400).json({
        status: 'error',
        message: error.errors.join(', ')
      })
    } else {
      res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
  }
}
