const {Router} = require('express') 

 const router = Router() 

const { createZona, getZonas, getZonaById, deleteZona, updateZona } = require('../controllers/zona.controller')


 // Estructura a utilizar respecto a las peticiones 

 router.route('/')  //ruta home o inicial 

    .get(getZonas)
    .post(createZona) 

router.route('/:id') 
    .get(getZonaById) 
    .delete(deleteZona) 
    .put(updateZona) 


module.exports = router; 