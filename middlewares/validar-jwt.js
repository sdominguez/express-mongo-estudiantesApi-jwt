const jwt = require('jsonwebtoken');
const {request, response} = require('express');

const validarJWT = (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    try {
        const { uid, name } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        req.name = name;
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    validarJWT
}