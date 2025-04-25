const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

app.use(express.json());

// URL de conexión a MongoDB (base de datos estudiantes)
const mongoDBURI = 'mongodb://localhost:27017/estudiantesDB';

// Conexión a MongoDB
mongoose.connect(mongoDBURI)
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));


app.use('/api/estudiantes', require('./routes/estudiantes'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/login'));


app.listen(3033, () => {
    console.log('Servidor ejecutándose en http://localhost:3033');
});
