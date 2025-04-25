const {response} = require('express');
const mongoose = require('mongoose'); 
const {usuarioSchema} = require('../models/usuarios.js'); 


// Creación de Modelos 
const Usuario = mongoose.model('Usuario',usuarioSchema);

/**
 * Obtiene lista de todos los usuarios de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getAllUsuarios = async(req, res = response) =>{
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios: ',error);
        res.status(500).json({ error: 'Error Interno del Servidor'});
    }
};

/**
 * Registra un usuario en base de datos
 * @param {*} req 
 * @param {*} res 
 */
const saveUsuario = async(req, res = response) => {
    try {
        const usuario = new Usuario({
            id: new mongoose.Types.ObjectId(),
            ...req.body
        });
        const resultado = await usuario.save();
        res.status(201).send(resultado);
    } catch (error) {
        res.status(400).send(error);
    }
};

/**
 * Obtiene un usuario por ID, el parámetro _id viene en el cuertpo de la solicitud
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getUsuarioById = async(req, res = response)=>{
    try{
        const {id} = req.params;
        if(!id){
            return res.status(400).json({mensaje:'requiere de un ID'});
        }
        const usuario = await Usuario.findById(id);
        if(!usuario){
            return res.status(400).json({
                mensaje: 'ID de Usuario no fue localizado'
            });
        }
        res.json(usuario);
    }catch(error){
        console.error('Error al buscar usuario por ID: ',error);
        res.status(500).json({mensaje:'Error interno del servidor'});
    }
};


/**
 * Actualiza la información del usuario, el id viene en el parámetro de segmento
 * @param {*} req 
 * @param {*} res 
 * @returns usuario actualizado
 */
const updateUsuario = async(req, res = response) => {
    try {
        const { id } = req.params;
        const actualizaciones = req.body;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, actualizaciones, { new: true, runValidators: true });
        
        if (!usuarioActualizado) {
            return res.status(404).send({mensaje: 'Usuario no encontrado' });
        }
        
        res.send(usuarioActualizado);
    } catch (error) {
        res.status(400).send(error);
    }
};

/**
 * Elimina usuario
 * @param {*} req 
 * @param {*} res 
 * @returns mensaje de eliminación
 */
const deleteUsuario = async(req, res = response) => {
    try {
        const { id } = req.params;
        const usuarioEliminado = await Usuario.findByIdAndDelete(id);
        if (!usuarioEliminado) {
            return res.status(404).send({ mensaje: 'Usuario no encontrado' });
        }        
        res.send({ mensaje: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(400).send(error);
    }
};


module.exports = {
    getAllUsuarios,
    saveUsuario,
    getUsuarioById,
    updateUsuario,
    deleteUsuario
};