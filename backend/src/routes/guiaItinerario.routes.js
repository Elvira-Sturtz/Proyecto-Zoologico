const { Router } = require("express");
const router = Router();

const {
  getGuiasItinerarios,
  createGuiaItinerario,
  getGuiaItinerarioById,
  deleteGuiaItinerario,
  updateGuiaItinerario,
  getMisItinerarios,
} = require("../controllers/guiaItinerario.controller");

const auth = require("../middlewares/auth.middleware");
const verificarRol = require("../middlewares/role.middleware");

// Ruta base: /api/guia-itinerarios
router
  .route("/")
  .get(auth, verificarRol("admin"), getGuiasItinerarios)
  .post(auth, verificarRol("admin"), createGuiaItinerario);

// Obtener itinerarios de un guia especifico - Mis itinerarios
router.get("/mis-itinerarios", auth, verificarRol("guia"), getMisItinerarios);

// Rutas con ID: /api/guia-itinerarios/:id
router
  .route("/:id")
  .get(auth, verificarRol("admin", "guia"), getGuiaItinerarioById)
  .delete(auth, verificarRol("admin"), deleteGuiaItinerario)
  .put(auth, verificarRol("admin"), updateGuiaItinerario);

module.exports = router;
