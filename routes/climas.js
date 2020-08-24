const express = require('express');
const router = express.Router();
const climaController = require('../controllers/climaController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.get('/', auth , climaController.obtenerClimas);

router.post('/', auth , [
	check('idclima', 'El idclima no debe estar vacio').not().isEmpty(),
] , climaController.crearClima);

router.delete('/:idclima', auth , climaController.eliminarClima);

router.put('/:idclima', auth, [
	check('idclima', 'El idclima no debe estar vacio').not().isEmpty(),
	check('orden', 'El orden no debe estar vacio').not().isEmpty(),
] , climaController.editarClima);

module.exports = router;