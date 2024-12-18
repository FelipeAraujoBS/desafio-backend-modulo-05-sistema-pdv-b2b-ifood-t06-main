const knex = require("../bancoDeDados/conexao");
const bcrypt = require("bcrypt");
const { emailJaExiste } = require("../utils/emailJaExiste");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    if (await emailJaExiste(email)) {
      return res
        .status(400)
        .json({ mensagem: "E-mail informado já esta em uso." });
    }
    const usuario = await knex("usuarios")
      .insert({ nome, email, senha: senhaCriptografada })
      .returning(["id", "nome", "email"]);
    return res.status(201).json(usuario);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensagem: "Houve um erro no servidor" });
  }
};

const detalharPerfil = async (req, res) => {
  const { id } = req.usuario;

  try {
    const usuario = await knex("usuarios")
      .select(["id", "nome", "email"])
      .first()
      .where({ id });

    if (!usuario) {
      return res.status(404).json("Usuário não encotrado!");
    }
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ mensagem: "Houve um erro no servidor" });
  }
};

const atualizarUsuario = async (req, res) => {
  const { id } = req.usuario;
  let { nome, email, senha } = req.body;

  try {
    if (senha) {
      senha = await bcrypt.hash(senha, 10);
    }

    if (email) {
      if (email !== req.usuario.email) {
        const emailUsuarioExiste = await emailJaExiste(email);

        if (emailUsuarioExiste) {
          return res.status(404).json("O Email informado já existe.");
        }
      }
    }

    const usuarioAtualizado = await knex("usuarios").where({ id }).update({
      nome,
      email,
      senha,
    });

    if (!usuarioAtualizado) {
      return res.status(400).json("O usuario não foi atualizado");
    }

    return res.status(200).json("Usuario foi atualizado com sucesso.");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

module.exports = {
  cadastrarUsuario,
  detalharPerfil,
  atualizarUsuario,
};
