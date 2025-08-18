import Joi from "joi";

export const lessonValidation = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  assignedTos: Joi.array().items(Joi.string()).optional(),
  completed: Joi.array().items(Joi.string()).optional()
});