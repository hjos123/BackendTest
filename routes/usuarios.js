const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');

//router.get('/', usuarioController.listarUsuario);
router.post('/', 
	[
		check('name', 'El nombre no debe estar vacio').not().isEmpty(),
		check('email', 'Agrega un correo valido').isEmail(),
		check('password', 'El password debe ser minimo de 6').isLength({min: 6}),
	], usuarioController.crearUsuario);
//router.put('/:userid', usuarioController.editarUsuario);
//router.delete('/:userid', usuarioController.eliminarUsuario);

module.exports = router;