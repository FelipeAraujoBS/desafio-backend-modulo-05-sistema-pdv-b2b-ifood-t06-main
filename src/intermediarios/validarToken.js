const knex = require('../bancoDeDados/conexao');
const jwt = require('jsonwebtoken');


const validarToken = async (req, res, next) => {
    const { authorization } = req.headers;
    
    if (!authorization) {
        return res.status(401).json({ Mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." })
    }
    
    const token = authorization.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ Mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." })
    }

    try {
        
        const  id  = await jwt.verify(token, process.env.SENHA_HASH, (err, decoded) => {
            if(err){
                return false
            }
            return decoded.id
        }) 
        
        if (!id){
            return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
        }

        const usuarioLogado = await knex('usuarios').select(['id', 'nome', 'email']).first()
            .where({ id });
     
        //  if (!usuarioLogado) {
        //     return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
        // }
        
        req.usuario = usuarioLogado;
        
        next();
    } catch (error) { 
        //console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = validarToken;