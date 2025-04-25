const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    usuario: {
        type: String,
        required: true,
        unique: true
    },
    correo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
        default: 'USER_ROLE'
    }
});

module.exports = model('Usuario', UsuarioSchema);
