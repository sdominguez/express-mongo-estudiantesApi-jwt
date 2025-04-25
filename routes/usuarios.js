const {Router} = require('express');

const { 
    getAllUsuarios,
    saveUsuario,
    getUsuarioById,
    updateUsuario,
    deleteUsuario
     } = require('../controllers/usuarios');

     const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', getAllUsuarios); 
router.get('/:id', [validarJWT], getUsuarioById); 
router.post('/', [validarJWT], saveUsuario);
router.put('/:id', [validarJWT], updateUsuario);
router.delete('/:id', [validarJWT], deleteUsuario);

module.exports = router;