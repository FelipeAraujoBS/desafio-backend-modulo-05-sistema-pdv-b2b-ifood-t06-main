const joi = require("joi");

const schemaCadastrarCliente = joi.object({
  nome: joi.string().strict().trim().required().messages({
    "any.required": "É obrigatorio preencher o campo nome.",
    "string.base": "O campo nome permite apenas letras.",
    "string.empty": "É obrigatorio preencher o campo nome.",
    "string.trim":
      "Não pode conter espaços no inicio ou no fim do campo nome! ",
  }),
  email: joi.string().email().required().messages({
    "any.required": "É obrigatorio preencher o campo E-mail.",
    "string.email": "É obrigatorio inserir um E-mail valido.",
    "string.empty": "É obrigatorio preencher o campo E-mail.",
  }),
  cpf: joi.string().required().messages({
    "any.required": "É obrigatorio preencher o campo cpf.",
    "string.empty":
      "É obrigatorio preencher o campo cpf com caracteres válidos e sem espaços.",
    "string.base": "Favor preencher o campo cpf corretamente",
    "string.trim": "Não pode conter espaços no inicio ou no fim do campo cpf!",
    "string.pattern.base": "Por favor informar o CPF como XXX.XXX.XXX-XX",
  }),
  cep: joi.string().messages({}).allow(""),
  rua: joi.string().messages({}).allow(""),
  numero: joi
    .number()
    .integer()
    .messages({
      "number.base": "Favor preencher o campo numero com números",
    })
    .allow(""),
  bairro: joi.string().messages({}).allow(""),
  cidade: joi.string().messages({}).allow(""),
  estado: joi.string().messages({}).allow(""),
});

module.exports = schemaCadastrarCliente;
