/**
 * Rutas de Eventos / Events
 * host + /api/events
 */
const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');


// Todas tienen que pasar por la validación del jWT
router.use( validarJWT ); // esta linea indica que de aqui en adelante se aplicara el jwt a todos
// los endpoints despues de declarada esta llamada


// obtener eventos

router.get('/', getEventos)

// Crear un nuevo evento
router.post('/',
    [
        check('title', 'Titulo es obligatorio').not().isEmpty(),
        check('start', 'Hora inicial es obligatoria').custom( isDate ),
        check('end', 'Hora final es obligatoria').custom( isDate ),
        check('notes', 'Debe ingresar al menos una nota').not().isEmpty(),
        validarCampos
    ],
    crearEvento)


// Crear un nuevo evento
router.put('/:i',  actualizarEvento)


// Crear un nuevo evento
router.delete('/:i',  eliminarEvento)

module.exports = router;

