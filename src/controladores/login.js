const knex = require("../bancoDeDados/conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await knex("usuarios").where({ email });

    if (usuario.length === 0) {
      return res.status(400).json("O usuario não foi encontrado");
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario[0].senha);

    if (!senhaCorreta) {
      return res.status(400).json("Email ou senha incorretos");
    }

    const token = jwt.sign({ id: usuario[0].id }, process.env.SENHA_HASH, {
      expiresIn: "8h",
    });

    return res.status(200).json({
      id: usuario[0].id,
      usuario: usuario[0].nome,
      token,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  login,
};
