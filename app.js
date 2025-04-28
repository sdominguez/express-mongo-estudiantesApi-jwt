const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

/**
 * Definición de las opciones de Cors
 * permite conexiones desde cualquier origen
 * métodos de HTTP 
 * Incluye cabecera x-token para pasar el JWT
 * Expone el encabezado x-token para ser leido desde el cliente
 */
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization', 'x-token'], 
    exposedHeaders: ['x-token']
  };

app.use(cors(corsOptions)); 
app.use(express.json());

const mongoDBURI = 'mongodb://localhost:27017/estudiantesDB';

mongoose.connect(mongoDBURI)
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));


app.use('/api/estudiantes', require('./routes/estudiantes'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/login'));


app.listen(3033, () => {
    console.log('Servidor ejecutándose en http://localhost:3033');
});
