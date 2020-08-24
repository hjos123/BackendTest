const Clima = require('../models/Clima');
const { validationResult } = require('express-validator');

exports.crearClima = (req, res) => {
	const errores = validationResult(req);
	if (!errores.isEmpty())
		res.status(404).json({ errores: errores.array() });

	const clima = new Clima(req.body);
	clima.idusuario = req.usuario.id;

	Clima.create(clima, (err, data) => {
	    if (err)
	      return res.status(404).json({
	        message:
	          err.message || "Some error occurred while creating the Usuarios."
	      });
	    else{
	    	return res.json(data);
	    }
	}); 
}

exports.editarClima = (req, res) => {
	const { idclima } = req.params;
	const { orden } = req.body;
	
	Clima.edit(idclima, orden, (err, data) => {
	    if (err)
	      return res.status(404).json({
	        message:
	          err.message || "Some error occurred while creating the Usuarios."
	      });
	    else{
	    	return res.json(data);
	    }
	}); 
}

exports.eliminarClima = (req, res) => {
	const { idclima } = req.params;
	const { id } = req.usuario;
	
	Clima.delete(idclima, id, (err, data) => {
	    if (err)
	      return res.status(404).json({
	        message:
	          err.message || "Some error occurred while creating the Usuarios."
	      });
	    else{
	    	return res.json(data);
	    }
	}); 
}

exports.obtenerClimas = (req, res) => {
	const { id } = req.usuario;
	
	Clima.getAll( id, (err, data) => {
	    if (err)
	      return res.status(404).json({
	        message:
	          err.message || "Some error occurred while creating the Usuarios."
	      });
	    else{
	    	return res.json(data);
	    }
	}); 
}