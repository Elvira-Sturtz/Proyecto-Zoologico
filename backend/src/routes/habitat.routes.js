const { Router } = require("express");

const router = Router();

const {
  createHabitat,
  getHabitats,
  getHabitatById,
  deleteHabitat,
  updateHabitat,
} = require("../controllers/habitat.controller");

const auth = require("../middlewares/auth.middleware");
const verificarRol = require("../middlewares/role.middleware");

router
  .route("/") //ruta base: /api/habitats

  .get(auth, verificarRol("admin"), getHabitats)
  .post(auth, verificarRol("admin"), createHabitat);

// Rutas con ID: /api/habitats/:id
router
  .route("/:id")
  .get(auth, verificarRol("admin"), getHabitatById)
  .delete(auth, verificarRol("admin"), deleteHabitat)
  .put(auth, verificarRol("admin"), updateHabitat);

module.exports = router;
