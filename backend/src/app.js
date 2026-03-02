const express = require('express') 
 const cors = require('cors') 

 const app = express(); 

 // configuración 
 app.set('port', process.env.PORT || 4000) 
 
//middlewares 
app.use(cors()) 
app.use(express.json())

// rutas 

app.get('/', (req, res)=>{
    res.send('Bienvenido a mi api rest full');
}) 

// rutas zoo 
app.use('/api/zonas', require('./routes/zona.routes')) 

app.use('/api/habitats', require('./routes/habitat.routes'))

module.exports = app; 