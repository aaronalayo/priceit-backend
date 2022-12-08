import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Response, Request } from 'express';
import { IUser } from '../models/user.model.js';

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      console.log('Validation Error: ' + error);
      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  user: {
    create: Joi.object<IUser>({
      user_name: Joi.string().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      repeat_password: Joi.ref('password'),
    }),
    update: Joi.object<IUser>({
      user_name: Joi.string().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    }),
  },
};
