const joi = require("joi");

const schemaCadastrarPedido = joi.object({
  cliente_id: joi.number().required().messages({
    "any.required": "O campo cliente_id é obrigatório.",
    "number.empty": "O campo cliente_id é obrigatório.",
    "number.base": "O campo valor permite apenas numeros.",
  }),
  observacao: joi.string(),
  pedido_produtos: joi
    .array()
    .items(
      joi.object({
        produto_id: joi.number().required().messages({
          "any.required": "O campo produto_id é obrigatório.",
          "number.empty": "O campo produto_id é obrigatório.",
          "number.base": "O campo produtos_id permite apenas numeros.",
        }),
        quantidade_produto: joi.number().required().messages({
          "any.required": "A quantidade dos produtos é obrigatório.",
          "number.empty": "A quantidade dos produtos é obrigatório.",
          "number.base": "O campo quantidade permite apenas numeros.",
        }),
      })
    )
    .required().min(1).messages({
        "array.min": "O pedido precisa conter pelo menos um item",
    }),
});

module.exports = schemaCadastrarPedido;
