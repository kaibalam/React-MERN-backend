const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
const { patch } = require('./routes/auth');
const path = require('path');
require('dotenv').config();


console.log(process.env);
//Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

//CORS
app.use(cors());

// Directorio público
app.use(express.static('public'));

// Lectura y parseo del body
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})
//TODO: CRUD: Eventos


//Escuchar peticiones
const port = 4000;

app.listen( port, () => {
    console.log(`Servidor correiendo en puerto ${port}`)
})