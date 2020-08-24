const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/', 
	[
		check('email', 'Agrega un correo valido').isEmail(),
		check('password', 'El password debe ser minimo de 6').isLength({min: 6}),
	], authController.login);

router.post('/validToken', authController.validarToken);

module.exports = router;