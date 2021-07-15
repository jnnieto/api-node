const { Router } = require('express');
const { check } = require('express-validator');
const { usuarioPut, usuarioGet, usuarioPost, usuarioDelete, usuarioPatch } = require('../controllers/user.controller');
const { esRolValido, emailExiste, existeUsuarioId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuarioGet)
router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('role').custom(esRolValido),
    validarCampos
], usuarioPut)
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La constraseña es obligatorio y debe tener más de 6 letras').isLength({min: 6}),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExiste),
    // check('role', 'No es un rol permitido').isIn([ 'ADMIN_ROLE', 'USER_ROLE' ]),
    check('role').custom(esRolValido),
    validarCampos
], usuarioPost)
router.delete('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
], usuarioDelete)

module.exports = router;