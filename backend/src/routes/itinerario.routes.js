const { Router } = require('express')
const router = Router()

const {
  getItinerarios,
  createItinerario,
  getItinerarioById,
  deleteItinerario,
  updateItinerario
} = require('../controllers/itinerario.controller')

// Ruta base: /api/itinerarios
router.route('/')
  .get(getItinerarios)
  .post(createItinerario)

// Rutas con ID: /api/itinerarios/:id
router.route('/:id')
  .get(getItinerarioById)
  .delete(deleteItinerario)
  .put(updateItinerario)

module.exports = router 