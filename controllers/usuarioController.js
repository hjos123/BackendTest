const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.crearUsuario = async (req, res) => {
	const errores = validationResult(req);
	if (!errores.isEmpty())
		return res.status(404).json({ errores: errores.array() });

	const usuario = new Usuario(req.body);
	const salt = await bcryptjs.genSalt(10);
	usuario.password = await bcryptjs.hash(usuario.password, salt);

	Usuario.create(usuario, (err, data) => {
	    if (err)
	      return res.status(402).json({
	        message:
	          err.message || "Some error occurred while creating the Usuarios."
	      });
	    else{
	    	return res.json(data);
	    }
	});
}

exports.editarUsuario = async (req, res) => {
	const { userid } = req.params;
	const usuario = new Usuario(req.body);
	Usuario.edit(userid , usuario, (err, data) => {
	    if (err)
	      return res.status(404).json({
	        message:
	          err.message || "Some error occurred while creating the Usuarios."
	      });
	    else 
	    	return res.json(data);
	});
}

exports.eliminarUsuario = async (req, res) => {
	const { userid } = req.params;

	Usuario.delete(userid, (err, data) => {
	    if (err)
	      return res.status(404).json({
	        message:
	          err.message || "Some error occurred while creating the Usuarios."
	      });
	    else 
	    	return res.json({ message: `Usuario Eliminado` });
	});
}

exports.listarUsuario = async (req, res) => {
	Usuario.getAll( (err, data) => {
	    if (err)
	      return res.status(404).json({
	        message:
	          err.message || "Some error occurred while geting the Usuarios."
	      });
	    else 
	    	return res.json(data);
	});
}