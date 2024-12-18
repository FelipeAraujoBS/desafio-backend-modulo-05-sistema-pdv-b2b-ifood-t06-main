const knex = require("../bancoDeDados/conexao");

const emailJaExiste = async (email) => {
  return await knex("usuarios").first().where({ email });
};

const v2EmailJaExiste = async (email, tabela) => {
  return await knex(tabela).first().where({ email });
};

const usuarioExistePorId = async (id) => {
  return await knex("usuarios").where({ id }).first();
};

module.exports = { emailJaExiste, v2EmailJaExiste, usuarioExistePorId };
