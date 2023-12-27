const mongoose = require('mongoose')

mongoose.connect('mongodb://mongodb/culqi')
    .then(db => console.log('Db esta conectado a', db.connection.host))
    .catch(err => console.error(err));