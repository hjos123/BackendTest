const sql = require('../config/db');

const Usuario = function(usuario) {
  this.email = usuario.email;
  this.name = usuario.name;
  this.password = usuario.password;
};

Usuario.create = (newUsuario, result) => {
  sql.query("INSERT INTO usuarios SET ?", newUsuario, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created Usuario: ", { id: res.insertId, ...newUsuario });
    result(null, { id: res.insertId, ...newUsuario });
  });
};

Usuario.edit = (id, usuario, result) => {
  sql.query(`UPDATE usuarios SET name='${usuario.name}', email='${usuario.email}', password='${usuario.password}' WHERE id=${id}`, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ message: "No existe el usuario" }, null);
        return;
      }

    result(null, { id: id, ...usuario });
  });
};

Usuario.delete = (id, result) => {
  sql.query(`DELETE FROM usuarios WHERE id=${id}`, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ message: "No existe el usuario" }, null);
      return;
    }
    result(null, res);
  });
};

Usuario.getAll = result => {
  sql.query("SELECT * FROM usuarios", (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Usuario.login = (email, password, result) => {
  sql.query(`SELECT * FROM usuarios WHERE email='${email}'`, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }

     if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ message: "No existe el usuario" }, null);
  });
};

module.exports = Usuario;