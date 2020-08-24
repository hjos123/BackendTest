const sql = require('../config/db');

const Clima = function(clima) {
  this.idclima = clima.idclima;
  this.orden = clima.orden;
  this.idusuario = clima.idusuario;
};

Clima.create = (newClima, result) => {
  sql.query("INSERT INTO clima SET ?", newClima, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created Usuario: ", { id: res.insertId, ...newUsuario });
    result(null, { id: res.insertId, ...newClima });
  });
};

Clima.edit = (id, orden, result) => {
  sql.query(`UPDATE clima SET orden=${orden} WHERE id=${id}`, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ message: "No existe el clima" }, null);
        return;
      }

    result(null, { id: id, ...orden });
  });
};

Clima.delete = (id, idusuario, result) => {
  sql.query(`DELETE FROM clima WHERE idclima=${id} and idusuario=${idusuario}`, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ message: "No existe el clima" }, null);
      return;
    }
    result(null, res);
  });
};

Clima.getAll = ( idusuario, result) => {
  sql.query(`SELECT * FROM clima WHERE idusuario=${idusuario}`, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Clima;