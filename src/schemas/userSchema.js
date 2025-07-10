const Joi = require('joi');

const userCreateSchema = Joi.object({
  message: Joi.string().required(),
  _id: Joi.string().min(1).required()
});

const userListSchema = Joi.object({
  quantidade: Joi.number().required(),
  usuarios: Joi.array().items(
    Joi.object({
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      administrador: Joi.string().valid('true', 'false').required(),
      _id: Joi.string().min(1).required()
    })
  ).required()
});

const userByIdSchema = Joi.object({
  _id: Joi.string().min(1).required(),
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  administrador: Joi.string().valid('true', 'false').required()
});

const userDeleteSchema = Joi.object({
  message: Joi.string().required()
});

const userUpdateSchema = Joi.object({
  message: Joi.string().required()
});

module.exports = { userCreateSchema, userListSchema, userByIdSchema, userDeleteSchema, userUpdateSchema };