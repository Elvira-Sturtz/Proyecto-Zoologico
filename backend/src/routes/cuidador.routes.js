const { Router } = require('express')
const router = Router()

const {
  getCuidadores,
  createCuidador,
  getCuidadorById,
  deleteCuidador,
  updateCuidador
} = require('../controllers/cuidador.controller')

// Ruta base: /api/cuidadores
router.route('/')
  .get(getCuidadores)
  .post(createCuidador)

// Rutas con ID: /api/cuidadores/:id
router.route('/:id')
  .get(getCuidadorById)
  .delete(deleteCuidador)
  .put(updateCuidador)

module.exports = router 