const { response } = require('express');
const Estudiante = require('../models/estudiantes');

const getEstudiantes = async (req, res = response) => {
    try {
        const estudiantes = await Estudiante.find();
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener estudiantes', error });
    }
};

const getEstudiante = async (req, res = response) => {
    const { matricula } = req.params;
    try {
        const estudiantes = await Estudiante.find({ matricula: parseInt(matricula) });
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener estudiantes', error });
    }
};

const addEstudiante = async (req, res = response) => {
    const { matricula, nombre, carrera, edad } = req.body;
    try {
        const nuevoEstudiante = new Estudiante({ matricula, nombre, carrera, edad });
        await nuevoEstudiante.save();
        res.json({
            msg: `El estudiante ${nombre} ha sido creado`,
            estudiante: nuevoEstudiante
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear el estudiante', error });
    }
};


const updateEstudiante = async (req, res = response) => {
    const { matricula } = req.params;
    const { nombre, carrera, edad } = req.body;
    try {
        const updatedEstudiante = await Estudiante.findOneAndUpdate(
            { matricula: parseInt(matricula) },
            { nombre, carrera, edad },
            { new: true }
        );
        if (!updatedEstudiante) {
            return res.status(404).json({ msg: 'Estudiante no encontrado' });
        }
        res.json({
            msg: `El estudiante con matrícula ${matricula} ha sido actualizado`,
            estudiante: updatedEstudiante
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar el estudiante', error });
    }
};

const updateEdadEstudiante = async (req, res = response) => {
    const { matricula } = req.params;
    const { edad } = req.body;
    try {
        const updatedEstudiante = await Estudiante.findOneAndUpdate(
            { matricula: parseInt(matricula) },
            { edad },
            { new: true }
        );
        if (!updatedEstudiante) {
            return res.status(404).json({ msg: 'Estudiante no encontrado' });
        }
        res.json({
            msg: `El estudiante con matrícula ${matricula} ha sido actualizado`,
            nombre: updatedEstudiante.nombre,
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar el estudiante', error });
    }
};

const deleteEstudiante = async (req, res = response) => {
    const { matricula } = req.params;
    if (!matricula) {
        return res.status(400).json({ msg: 'Matrícula no válida' });
    }
    try {
        const deletedEstudiante = await Estudiante.findOneAndDelete({ matricula: matricula });
        if (!deletedEstudiante) {
            return res.status(404).json({ msg: 'Estudiante no encontrado' });
        }
        res.status(200).json({
            msg: `El estudiante con matrícula ${matricula} ha sido eliminado`,
            estudiante: deletedEstudiante
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar el estudiante', error });
    }
};

module.exports = {getEstudiantes,addEstudiante,updateEstudiante,
    updateEdadEstudiante, deleteEstudiante, getEstudiante};