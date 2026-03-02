const {Router} = require('express') 

 const router = Router() 

const { createHabitat, getHabitats, getHabitatById, deleteHabitat, updateHabitat } = require('../controllers/habitat.controller')


  

 router.route('/')  //ruta base: /api/habitats

    .get(getHabitats)
    .post(createHabitat) 

    // Rutas con ID: /api/habitats/:id
router.route('/:id') 
    .get(getHabitatById) 
    .delete(deleteHabitat) 
    .put(updateHabitat) 


module.exports = router; 