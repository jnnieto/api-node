const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Obtener todas las categorias - publico
router.get('/', [
    
], );

// Obtener una categoria por su id - publico
router.get('/:id', );

// Crear una nueva categoria - privado
router.post('/', )

// Actualizar una categoria por el id - privado
router.put('/:id', )

// Eliminar una categoria - Administrador 
router.delete('/:id', )

module.exports =  router;