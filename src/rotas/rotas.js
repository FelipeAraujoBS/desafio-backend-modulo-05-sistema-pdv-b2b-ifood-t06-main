const express = require("express");
const validarToken = require("../intermediarios/validarToken");
const verificarRequisicao = require("../intermediarios/validarRequisicao");
const validarExclusao = require("../intermediarios/validarExclusao")

const schemaUsuario = require("../schemas/schemaUsuario");
const schemaLogin = require("../schemas/schemaLogin");
const schemaAtualizarUsuario = require("../schemas/schemaAtualizarUsuario");
const schemaValidarProdutos = require("../schemas/schemaValidarProduto");
const schemaCadastrarCliente = require("../schemas/schemaCadastrarCliente");
const schemaAtualizarCliente = require("../schemas/schemaAtualizarCliente");
const schemaCadastrarPedido = require("../schemas/schemaCadastrarPedido");

const categoria = require("../controladores/categoria");
const usuario = require("../controladores/usuario");
const login = require("../controladores/login");
const produto = require("../controladores/produto");
const cliente = require("../controladores/cliente");
const pedido = require("../controladores/pedido");

const rotas = express();

rotas.get("/categoria", categoria.listarCategorias);
rotas.post("/login", verificarRequisicao(schemaLogin), login.login);
rotas.post("/usuario", verificarRequisicao(schemaUsuario),usuario.cadastrarUsuario);

rotas.use(validarToken);

rotas.get("/usuario", usuario.detalharPerfil);
rotas.put("/usuario", verificarRequisicao(schemaAtualizarUsuario), usuario.atualizarUsuario);

rotas.get("/cliente", cliente.listarClientes);
rotas.get("/cliente/:id", cliente.detalharCliente);
rotas.post("/cliente", verificarRequisicao(schemaCadastrarCliente), cliente.cadastrarCliente);
rotas.put("/cliente/:id", verificarRequisicao(schemaAtualizarCliente), cliente.atualizarCliente);

rotas.post("/produto", verificarRequisicao(schemaValidarProdutos), produto.cadastrarProduto);
rotas.put("/produto/:id", verificarRequisicao(schemaValidarProdutos), produto.editarProduto);
rotas.get("/produto", produto.listarProduto);
rotas.get("/produto/:id", produto.detalharProduto);
rotas.delete(
  "/produto/:id",
  validarExclusao.produtoEstaVinculado,
  produto.excluirProduto);

rotas.get("/pedidos", pedido.listarPedido);
rotas.post("/pedidos",verificarRequisicao(schemaCadastrarPedido), pedido.cadastrarPedido);

module.exports = rotas;
