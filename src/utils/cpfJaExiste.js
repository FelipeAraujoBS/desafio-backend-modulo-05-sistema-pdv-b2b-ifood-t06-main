const knex = require("../bancoDeDados/conexao");

const cpfJaExiste = async (cpf) => {
  return await knex("clientes").first().where({ cpf });
};

module.exports = { cpfJaExiste };
