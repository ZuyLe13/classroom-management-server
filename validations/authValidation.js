import Joi from 'joi';

export const phoneValidation = Joi.object({
  phone: Joi.string().pattern(/^[0-9]{11}$/).required()
});

export const accessCodeValidation = Joi.object({
  phone: Joi.string().pattern(/^[0-9]{11}$/).required(),
  accessCode: Joi.string().length(6).pattern(/^[0-9]+$/).required()
});