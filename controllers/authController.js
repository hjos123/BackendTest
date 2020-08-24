const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.login = (req, res) => {
	const {email, password} = req.body;
	const errores = validationResult(req);
	if (!errores.isEmpty())
		return res.status(404).json({ errores: errores.array() });

	Usuario.login(email, password, async (err, data) => {
		if (err)
	      return res.status(404).json({
	        message:
	          err.message || "Some error occurred while creating the Usuarios."
	      });


		const passwordCorrect = await bcryptjs.compare(password, data.password);
    		if (!passwordCorrect)
    			return res.status(404).json({ message: 'Contraseña Incorrecta'});

	  	const payload = {
    		usuario: {
    			id: data.id,
    			name: data.name,
    			email: data.email,
    		}
    	};

    	jwt.sign(payload, "PruebaTest23082020", {
    		expiresIn: 3600
    	}, (error,token) => {
    		if (error) throw error;
    		  return res.json({ token, usuario: payload.usuario });
    	});
    	
	});
}

exports.validarToken = (req, res) => {
    const { token } = req.body;
    const cifrado = jwt.verify(token, "PruebaTest23082020");
    const usuario = cifrado.usuario;

    try{
        const cifrado = jwt.verify(token, "PruebaTest23082020");
        const usuario = cifrado.usuario;
        return res.json({ usuario: usuario });
    }catch(error){
        return res.status(401).json({message: "Token Invalido"});
    }
}