const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerProductos, crearProducto, obtenerProductoId, actualizarProducto, eliminarProducto } = require('../controllers/product.controller');
const { existeCategoria, existeProductoId } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

//Obtener los productos paginados - publico
router.get('/', obtenerProductos);

// Obtener un producto por id
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
], obtenerProductoId);

// Crear un nuevo producto - privado
router.post('/', [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('price', 'El precio es obligatorio y debe ser un numero').isNumeric(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('category', 'La categoria es obligatoria').notEmpty(),
    check('category').custom(existeCategoria),
    validarCampos
], crearProducto);

// Actualizar la informacion de un producto - privado
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
], actualizarProducto);

// Eliminar un producto - privado
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
], eliminarProducto);

module.exports = router;
