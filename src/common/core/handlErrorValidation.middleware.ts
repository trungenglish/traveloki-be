import yup from 'yup';

import { IRequest } from "../interfaces/Requests";

interface IValidatorHandler extends IRequest {
  schema: yup.ObjectSchema<any>;
}

export const validatorHandler = async ({ req, res, next, schema }: IValidatorHandler) => {
  try {
    await schema.validate(req.body);
    next(); 
  } catch (error: any) {
    res.status(400).json({
        status: 'error',
        message: error.details[0].message.replace('/[^a-zA-Z0-9 ]/g', '')
    });
  }
};
