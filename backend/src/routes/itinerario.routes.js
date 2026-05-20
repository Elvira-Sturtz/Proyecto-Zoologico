const { Router } = require("express");
const router = Router();

const {
  getItinerarios,
  createItinerario,
  getItinerarioById,
  deleteItinerario,
  updateItinerario,
} = require("../controllers/itinerario.controller");

const auth = require("../middlewares/auth.middleware");
const verificarRol = require("../middlewares/role.middleware");

// Ruta base: /api/itinerarios
router
  .route("/")
  .get(auth, verificarRol("admin"), getItinerarios)
  .post(auth, verificarRol("admin"), createItinerario);

// Rutas con ID: /api/itinerarios/:id
router
  .route("/:id")
  .get(auth, verificarRol("admin"), getItinerarioById)
  .delete(auth, verificarRol("admin"), deleteItinerario)
  .put(auth, verificarRol("admin"), updateItinerario);

module.exports = router;
