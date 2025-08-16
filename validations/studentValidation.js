import Joi from "joi";

export const studentValidation = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9]{11}$/).required(),
  role: Joi.string().valid("student", "instructor").required(),
  address: Joi.string().min(5).max(200).required()
});