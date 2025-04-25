const { Schema, model } = require('mongoose');

const EstudianteSchema = Schema({
    matricula: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    carrera: {
        type: String,
        required: true
    },
    edad: {
        type: Number
    }
});

module.exports = model('Estudiante', EstudianteSchema);
