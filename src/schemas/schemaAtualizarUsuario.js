const Joi = require("joi");

const schemaAtualizarUsuario = Joi.object({
  nome: Joi.string().strict().trim().messages({
    "string.base": "O campo nome permite apenas letras.",
    "string.empty": "É obrigatorio preencher o campo nome.",
    "string.trim": "Não pode conter espaços no inicio ou no fim!",
  }),
  senha: Joi.string().strict().trim().messages({
    "string.empty": "É obrigatorio preencher o campo senha.",
    "string.base": "O campo senha deve conter letras.",
    "string.trim": "Não pode conter espaços no inicio ou no fim!",
  }),
  email: Joi.string().strict().trim().email().messages({
    "string.email": "É obrigatorio inserir um E-mail valido.",
    "string.empty": "É obrigatorio preencher o campo E-mail.",
    "string.trim": "Não pode conter espaços no inicio ou no fim!",
  }),
});

module.exports = schemaAtualizarUsuario;
