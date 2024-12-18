const knex = require("../bancoDeDados/conexao");

const listarCategorias = async (req, res) => {
  try {
    const categorias = await knex.select("descricao").from("categorias");

    if (categorias.length === 0) {
      return res.status(404).json("Não há categorias cadastradas");
    } else {
      return res.status(200).json(categorias);
    }
  } catch (error) {
    return res.status(500).json({ mensagem: "Houve um erro no servidor" });
  }
};


module.exports = {
  listarCategorias,
};
