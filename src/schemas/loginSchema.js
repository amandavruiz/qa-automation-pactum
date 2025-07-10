const Joi = require('joi');

const loginSchema = Joi.object({
  message: Joi.string().required(),
  authorization: Joi.string().required()
});

module.exports = { loginSchema };