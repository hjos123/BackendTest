const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
	//Leer
	const token = req.header('x-auth-token');
	//Revisar
	if (!token)
		return res.status(401).json({message: "No hay token"});
	//Validar
	try{
		const cifrado = jwt.verify(token, "PruebaTest23082020");
		req.usuario = cifrado.usuario;
		next();
	}catch(error){
		return res.status(401).json({message: "Token Invalido"});
		res.end();
	}
} 