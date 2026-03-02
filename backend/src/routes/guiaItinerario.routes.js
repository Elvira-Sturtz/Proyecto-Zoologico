const { Router } = require('express');
const router = Router();

const {
  getGuiasItinerarios,
  createGuiaItinerario,
  getGuiaItinerarioById,
  deleteGuiaItinerario,
  updateGuiaItinerario
} = require('../controllers/guiaItinerario.controller');

// Ruta base: /api/guia-itinerarios
router.route('/')
  .get(getGuiasItinerarios)
  .post(createGuiaItinerario);

// Rutas con ID: /api/guia-itinerarios/:id
router.route('/:id')
  .get(getGuiaItinerarioById)
  .delete(deleteGuiaItinerario)
  .put(updateGuiaItinerario);

module.exports = router; 