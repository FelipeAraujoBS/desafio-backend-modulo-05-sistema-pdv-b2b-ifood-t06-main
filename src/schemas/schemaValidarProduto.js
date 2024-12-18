const joi = require("joi");

const schemaProduto = joi.object({
  descricao: joi.string().required().messages({
    "any.required": "O campo descricao é obrigatório.",
    "string.empty": "O campo descricao é obrigatório.",
    "string.base": "O campo descricao permite apenas letras.",
  }),
  quantidade_estoque: joi.number().required().messages({
    "any.required": "O campo quantidade_estoque é obrigatório.",
    "number.empty": "O campo quantidade_estoque é obrigatório.",
    "number.base": "O campo quantidade_estoque permite apenas numeros.",
  }),
  valor: joi.number().required().messages({
    "any.required": "O campo valor é obrigatório.",
    "number.empty": "O campo valor é obrigatório.",
    "number.base": "O campo valor permite apenas numeros.",
  }),
  categoria_id: joi.number().required().messages({
    "any.required": "O campo categoria é obrigatório.",
    "number.empty": "O campo categoria_id é obrigatório.",
    "number.base": "O campo valor permite apenas numeros.",
  }),
});

module.exports = schemaProduto;
