const joi = require("joi");

const schemaAtualizarCliente = joi.object({
  nome: joi.string().strict().trim().messages({
    "any.required": "É obrigatorio preencher o campo nome.",
    "string.base": "O campo nome permite apenas letras.",
    "string.empty": "É obrigatorio preencher o campo nome.",
    "string.trim": "Não pode conter espaços no inicio ou no fim do campo nome!",
  }),
  email: joi.string().strict().trim().email().messages({
    "any.required": "É obrigatorio preencher o campo email.",
    "string.email": "É obrigatorio inserir um E-mail valido.",
    "string.empty": "É obrigatorio preencher o campo E-mail.",
    "string.trim":
      "Não pode conter espaços no inicio ou no fim do campo email!",
  }),
  cpf: joi
    .string()
    .pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .strict()
    .trim()
    .messages({
      "any.required": "É obrigatorio preencher o campo cpf.",
      "string.empty": "É obrigatorio preencher o campo cpf.",
      "string.base": "O campo cpf deve conter letras.",
      "string.trim":
        "Não pode conter espaços no inicio ou no fim do campo cpf!",
      "string.pattern.base": "Por favor informar o CPF como XXX.XXX.XXX-XX",
    }),
  cep: joi.string().messages({}).allow(""),
  rua: joi.string().messages({}),
  numero: joi
    .number()
    .integer()
    .messages({
      "number.base": "Favor preencher o campo numero com números",
    })
    .allow(""),
  bairro: joi.string().messages({}),
  cidade: joi.string().messages({}),
  estado: joi.string().messages({}),
});

module.exports = schemaAtualizarCliente;
