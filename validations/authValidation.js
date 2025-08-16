import Joi from 'joi';

export const phoneValidation = Joi.object({
  phone: Joi.string().pattern(/^[0-9]{11}$/).required()
});

export const emailValidation = Joi.object({
  email: Joi.string().email().required()
});

export const accessCodeValidation = Joi.object({
  phone: Joi.string().pattern(/^[0-9]{11}$/).optional(),
  accessCode: Joi.string().length(6).pattern(/^[0-9]+$/).required(),
  email: Joi.string().email().optional()
});