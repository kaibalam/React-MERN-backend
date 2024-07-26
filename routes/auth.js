
/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post(
    '/new',
    [
        //middelwares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracters').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario
);
router.post(
    '/',
    [
        check('email', 'El email es inválido').isEmail(),
        check('password', 'El password no es correcto debe de tener 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
);
router.get('/renew', validarJWT, revalidarToken)

module.exports = router; 