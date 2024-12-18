const knex = require("../bancoDeDados/conexao");

const selecionarPropriedadePorTabela = async (propriedade, tabela) => {
  return await knex(tabela)
    .first()
    .where({ ...propriedade });
};

module.exports = { selecionarPropriedadePorTabela };
