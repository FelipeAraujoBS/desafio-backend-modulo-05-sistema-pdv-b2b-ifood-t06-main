const knex = require("../bancoDeDados/conexao");
const clienteExiste = require("../utils/clienteExiste");
const enviarEmail = require("../utils/envioEmails/envioEmail")

const cadastrarPedido = async (req, res) => {
  const { cliente_id, pedido_produtos, observacao } = req.body;

 try {
  const cliente = await clienteExiste(cliente_id);

  if (!cliente) {
    return res.status(404).json({ mensagem: "Cliente não localizado." });
  }
  let valorTotal = 0;
  for (produto of pedido_produtos) {
    const produtoEncontrado = await knex("produtos").where({id: produto.produto_id});

    if (produtoEncontrado.length == 0) {
      return res.status(404).json({ mensagem: "Produto não encontrado." });
    }
    if (produtoEncontrado.quantidade_estoque < produto.quantidade_produto) {
      return res.status(404).json({ mensagem: "Estoque insuficiente." });
    }
    valorTotal += produto.quantidade_produto * produtoEncontrado[0].valor;
  }
  const adicionarPedido = await knex("pedidos")
    .insert({
      cliente_id,
      observacao,
      valor_total: valorTotal,
    })
    .returning("id");

 for (produto of pedido_produtos){
  const produtoEncontrado = await knex("produtos").where({
    id: produto.produto_id,
  });
  const adicionarPedidoProduto = await knex("pedido_produtos")
  .insert({
    pedido_id: adicionarPedido[0].id,
    produto_id:produto.produto_id,
    quantidade_produto: produto.quantidade_produto,
    valor_produto: produtoEncontrado[0].valor
  });
 }

 await enviarEmail(cliente_id)

 return res.status(200).json({mensagem: "Seu pedido foi cadastrado com sucesso você recebera um email confirmando seu pedido!"});
   
 } catch (error) {
  console.log(error)
  return res.status(500).json({ mensagem: "Houve um erro no servidor" });
 }

};

const listarPedido = async (req, res) => {
  const { cliente_id } = req.query;
  try {
    if (!cliente_id) {
      const pedidos = await knex("pedidos");
      return res.status(200).json(pedidos);
    }
    const pedidos = await knex("pedidos").where({ cliente_id });

    if (pedidos.length == 0) {
      return res
        .status(500)
        .json({ mensagem: "Não existe pedidos para o cliente!" });
    }
    return res.status(200).json(pedidos);
  } catch (error) {
    return res.status(500).json({ mensagem: "Houve um erro no servidor" });
  }
};

module.exports = {
  listarPedido,
  cadastrarPedido,
};
