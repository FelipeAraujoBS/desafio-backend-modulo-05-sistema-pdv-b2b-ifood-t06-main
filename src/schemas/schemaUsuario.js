const joi = require("joi");

const schemaUsuario = joi.object({
  nome: joi.string().strict().trim().required().messages({
    "any.required": "É obrigatorio preencher o campo nome.",
    "string.base": "O campo nome permite apenas letras.",
    "string.empty": "É obrigatorio preencher o campo nome.",
    "string.trim": "Não pode conter espaços no inicio ou no fim.",
  }),
  email: joi.string().email().required().messages({
    "any.required": "É obrigatorio preencher o campo E-mail.",
    "string.email": "É obrigatorio inserir um E-mail valido.",
    "string.empty": "É obrigatorio preencher o campo E-mail.",
  }),
  senha: joi.string().strict().trim().required().messages({
    "any.required": "É obrigatorio preencher o campo senha.",
    "string.empty": "É obrigatorio preencher o campo senha.",
    "string.base": "O campo senha deve conter letras.",
    "string.trim": "Não pode conter espaços no inicio ou no fim.",
  }),
});

module.exports = schemaUsuario;
