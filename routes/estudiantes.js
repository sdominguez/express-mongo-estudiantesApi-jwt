const express = require('express');
const router = express.Router();
const{
    getEstudiantes,addEstudiante,updateEstudiante,
    updateEdadEstudiante, deleteEstudiante, getEstudiante
} = require('../controllers/estudiantes');

router.get('/', getEstudiantes);
router.get('/:matricula', getEstudiante);
router.post('/', addEstudiante);
router.put('/:matricula', updateEstudiante);
router.patch('/:matricula', updateEdadEstudiante);
router.delete('/:matricula', deleteEstudiante);

module.exports = router;
