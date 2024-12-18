const knex = require('../bancoDeDados/conexao')
const { emailJaExiste, v2EmailJaExiste } = require('../utils/emailJaExiste');
const { cpfJaExiste } = require('../utils/cpfJaExiste');
const { encriptarString } = require('../utils/encriptarString');
const { selecionarPropriedadePorTabela } = require('../utils/selecionarPropriedadePorTabela');
const { object } = require('joi');
const clienteExiste = require("../utils/clienteExiste");

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {

        if (await v2EmailJaExiste(email, 'clientes')) {
            return res.status(400).json({ mensagem: "E-mail informado já esta em uso." })
        }
        
        if (await cpfJaExiste(parseInt(cpf))) {
            return res.status(400).json({ mensagem: "CPF informado já está cadastrado." })
        }

        const cliente = await knex('clientes')
                            .insert({ nome, email, cpf, 
                                    cep, rua, numero:Number(numero), bairro, cidade, estado })
                            .returning(['id', 'nome', 'email']);

        return res.status(201).json(cliente);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: "Houve um erro no servidor" })

    }
}

const atualizarCliente = async (req, res) => {

    const { id } = req.params;

    let { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {

        const clientePorId = await selecionarPropriedadePorTabela({ id }, 'clientes')

        if (!clientePorId) {
            return res.status(400).json({ mensagem: "O cliente informado não é válido ou não existe" })
        }

        if (cpf !== clientePorId.cpf) {
            if (await cpfJaExiste(cpf)) {
                return res.status(400).json({ mensagem: "CPF informado já está cadastrado." })
            }
        }

        if (email !== clientePorId.email) {
            if (await v2EmailJaExiste(email, 'clientes')) {
                return res.status(400).json({ mensagem: "E-mail informado já esta em uso." })
            }
        }

        const usuarioAtualizado = await knex("clientes").where({ id }).update({
            nome,
            email,
            cpf,
            cep, rua, numero:Number(numero), bairro, cidade, estado
        });

        if (!usuarioAtualizado) {
            return res.status(400).json("O usuario não foi atualizado");
        }

        return res.status(200).json("Usuario foi atualizado com sucesso.");
    } catch (error) {
    
        return res.status(400).json(error.message);
    }
};

const listarClientes = async (req, res) => {
    try {
        const clientes = await knex('clientes');
        return res.status(200).json(clientes);
    } catch (error) {
        return res.status(500).json({ mensagem: "Houve um erro no servidor" })
    }
}

const detalharCliente = async (req, res) => {
    const { id } = req.params
    try {
        const cliente = await clienteExiste(id);
        if (!cliente) {
            return res.status(404).json({ mensagem: "Cliente não localizado." })
        }
        return res.status(200).json(cliente)
    } catch (error) {
        return res.status(500).json({ mensagem: "Houve um erro no servidor" })
    }
}

module.exports = {
    cadastrarCliente,
    atualizarCliente,
    listarClientes,
    detalharCliente,
}

