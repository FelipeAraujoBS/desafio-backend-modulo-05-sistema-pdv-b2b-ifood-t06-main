const nodemailer = require("nodemailer")
const knex = require("../../bancoDeDados/conexao")

const contatarEmail = nodemailer.createTransport({
   host: process.env.EMAIL_HOST,
   port: process.env.EMAIL_PORT,
   auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS 
   }
});

const enviarEmail = async (clientId) => {
   
  try {
   const cliente = await knex("clientes").where({ id: clientId}).select("nome", "email").first();

   return contatarEmail.sendMail({
      from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
      to: `${cliente.nome} <${cliente.email}>`,
      subject: `Pedidos`,
      text: `O pedido foi efetuado com sucesso!`
   })
  } catch (error) {
      console.error(error);
  }
}

module.exports = enviarEmail