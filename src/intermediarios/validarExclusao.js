const knex = require('../bancoDeDados/conexao')

const produtoEstaVinculado = async (req, res, next) => {
    const id = req.params.id

    try {
        if (id) {
            const statusProduto = await knex("pedido_produtos").where({ produto_id: id })

            if (statusProduto.length !== 0) {
                res.status(401).json({ "mensagem": "O produto não pode ser excluído se estiver sendo usado em um pedido!" });
            } else {
                next();
            }
        }
    } catch (error) {
        res.status(500).json({ "mensagem": "Erro no servidor." })
    }
}

module.exports = {
    produtoEstaVinculado
}

