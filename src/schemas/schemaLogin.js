const joi = require("joi");

const schemaLogin = joi.object({
  email: joi.string().email().required().messages({
    "any.required": "Informe o E-mail de login",
    "string.email": "O campo email precisa ser um e-mail válido",
    "string.empty": "Informe o E-mail de login válido",
  }),
  senha: joi.string().required().messages({
    "any.required": "O campo senha é obrigatorio",
    "string.empty": "Informe a senha",
  }),
});

module.exports = schemaLogin;
