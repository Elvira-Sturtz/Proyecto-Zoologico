const mongoose = require('mongoose') 

// cadena de conexion 
const URI = process.env.MONGODB_URI
            ? process.env.MONGODB_URI
            : 'mongodb://localhost/dbtest'  

mongoose.connect(URI)
    .then(() => console.log('Base de datos conectada:', URI))
    .catch(err => console.error('Error de conexión:', err));



