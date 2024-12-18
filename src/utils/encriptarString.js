const knex = require("../bancoDeDados/conexao");
const bcrypt = require("bcrypt");

function encriptarString(valueString) {
  return bcrypt.hash(valueString, 10);
}

module.exports = { encriptarString };
