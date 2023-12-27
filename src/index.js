const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://mongo:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', function () {
  console.log('Conexión exitosa a MongoDB');
});

app.get('/', (req, res) => {
  res.send('¡Hola, Docker con Node.js y Mongoose!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});