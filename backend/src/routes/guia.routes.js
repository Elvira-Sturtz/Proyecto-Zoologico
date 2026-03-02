const { Router } = require('express')
const router = Router()

const {
  getGuias,
  createGuia,
  getGuiaById,
  deleteGuia,
  updateGuia
} = require('../controllers/guia.controller')

// Ruta base: /api/guias
router.route('/')
  .get(getGuias)
  .post(createGuia)

// Rutas con ID: /api/guias/:id
router.route('/:id')
  .get(getGuiaById)
  .delete(deleteGuia)
  .put(updateGuia)

module.exports = router 