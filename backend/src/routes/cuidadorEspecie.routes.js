const { Router } = require('express');
const router = Router();

const {
  getCuidadoresEspecies,
  createCuidadorEspecie,
  getCuidadorEspecieById,
  deleteCuidadorEspecie,
  updateCuidadorEspecie
} = require('../controllers/cuidadorEspecie.controller');

// Ruta base: /api/cuidador-especies
router.route('/')
  .get(getCuidadoresEspecies)
  .post(createCuidadorEspecie);

// Rutas con ID: /api/cuidador-especies/:id
router.route('/:id')
  .get(getCuidadorEspecieById)
  .delete(deleteCuidadorEspecie)
  .put(updateCuidadorEspecie);

module.exports = router; 