const {request, response} = require('express');
const { generarJWT } = require('../helpers/generar-jwt');

const Usuario = require('../models/usuarios');

const login = async (req = request, res = response) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email, password });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos'
            });
        }
        try{
            const payload = {
                id: usuario.id,
                name: usuario.name
            };
            const token = await generarJWT(payload);
            res.header('x-token', token);
            res.json({msg:  `Usuario ${usuario.name} logueado correctamente`});
        }catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: 'Error al generar el token'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al iniciar sesion'
        });
    }
}   
module.exports = {login};