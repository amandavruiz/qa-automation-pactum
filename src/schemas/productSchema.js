const Joi = require('joi');

const productCreateSchema = Joi.object({
  message: Joi.string().required(),
  _id: Joi.string().required()
});

const productListSchema = Joi.object({
  quantidade: Joi.number().required(),
  produtos: Joi.array().items(
    Joi.object({
      _id: Joi.string().required(),
      nome: Joi.string().required(),
      preco: Joi.number().required(),
      descricao: Joi.string().required(),
      quantidade: Joi.number().required()
    }).unknown(true)
  )
});

const productByIdSchema = Joi.object({
  _id: Joi.string().required(),
  nome: Joi.string().required(),
  preco: Joi.number().required(),
  descricao: Joi.string().allow(''),
  quantidade: Joi.number().required()
});

const productUpdateSchema = Joi.object({
  message: Joi.string().required()
});

const productDeleteSchema = Joi.object({
  message: Joi.string().required()
});

module.exports = {
  productCreateSchema,
  productListSchema,
  productByIdSchema,
  productUpdateSchema,
  productDeleteSchema
};