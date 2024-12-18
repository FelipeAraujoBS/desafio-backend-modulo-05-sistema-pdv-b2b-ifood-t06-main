const knex = require("../bancoDeDados/conexao");
const clienteExiste = async (id) => {
  try {
    return await knex("clientes").first().where({ id });
  } catch (error) {
    return res.status(500).json({ mensagem: "Houve um erro no servidor" });
  }
};

module.exports = clienteExiste;
