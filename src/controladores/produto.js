const knex = require("../bancoDeDados/conexao");
const { excluirImagemProduto } = require("../storage");
const { selecionarPropriedadePorTabela } = require("../utils/selecionarPropriedadePorTabela");

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const filtrarCategoria = await knex("categorias")
      .select("descricao")
      .where({ id: categoria_id })
      .returning(["descricao"]);

    if (filtrarCategoria.length === 0) {
      return res
        .status(400)
        .json({ mensagem: "categoria informada não existe!" });
    }

    const produto = await knex("produtos")
      .insert({ descricao, quantidade_estoque, valor, categoria_id })
      .returning(["descricao", "quantidade_estoque", "valor", "categoria_id"]);

    filtrarCategoria[0].descricao
      ? (produto[0]["categoria_nome"] = filtrarCategoria[0].descricao)
      : null;

    return res.status(201).json(produto);
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Houve um erro no servidor ao cadastrar o produto." });
  }
};

const editarProduto = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const produto = await selecionarPropriedadePorTabela({id}, 'produtos');

    if (!produto) {
      return res.status(404).json("Produto não encontrado");
    }

    const categoriaExiste = await selecionarPropriedadePorTabela({id:categoria_id}, 'categorias')

    if (!categoriaExiste) {
      return res
        .status(400)
        .json({ mensagem: "A categoria informada não existe!" });
    }

    await knex("produtos")
      .where({ id })
      .update({ descricao, quantidade_estoque, valor, categoria_id })
      .returning("*");

    return res.status(200).json({ message: "Produto atualizado com sucesso!" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Erro ao atualizar o produto!" });
  }
};

const listarProduto = async (req, res) => {
  const { categoria_id } = req.query;

  try {
    if (categoria_id) {
      const categoriaExiste = await selecionarPropriedadePorTabela({id:categoria_id}, 'categorias')

      if (!categoriaExiste) {
        return res
          .status(400)
          .json({ mensagem: "A categoria informada não existe!" });
      }
      const listarProduto = await knex("produtos").where("categoria_id", categoria_id);
      return res.status(200).json(listarProduto);
    }

    const produtos = await knex("produtos").where((query) => {
      if (categoria_id) {
        query = query.where("categoria_id", categoria_id);
      }
    });

    return res.status(200).json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar produtos." });
  }
};

const excluirProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await selecionarPropriedadePorTabela({id}, 'produtos')

    if (!produto || produto.length === 0) {
      return res.status(404).json("Produto não encontrado!");
    }

    if (produto.produto_imagem) {
      await excluirImagemProduto(produto.produto_imagem)
    }

    const produtoExcluido = await knex("produtos").delete().where({ id });

    if (produtoExcluido.rowCount === 0) {
      return res.status(400).json("O produto não foi excluido!");
    }

    return res.status(200).json("Produto excluido com sucesso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const detalharProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produtoDetalhado = await selecionarPropriedadePorTabela({id}, 'produtos')

    if (!produtoDetalhado || produtoDetalhado.length === 0) {
      return res.status(404).json("Produto não encontrado!");
    }

    return res.status(200).json(produtoDetalhado);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  cadastrarProduto,
  editarProduto,
  listarProduto,
  excluirProduto,
  detalharProduto,
};
