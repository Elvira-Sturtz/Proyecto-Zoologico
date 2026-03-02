const { Router } = require('express')
const router = Router()

const {  getEspecies,  createEspecie,  getEspecieById,  deleteEspecie,  updateEspecie} = require('../controllers/especie.controller')

// Ruta base: /api/especies
router.route('/')
  .get(getEspecies)
  .post(createEspecie)

// Rutas con ID: /api/especies/:id
router.route('/:id')
  .get(getEspecieById)
  .delete(deleteEspecie)
  .put(updateEspecie)

module.exports = router