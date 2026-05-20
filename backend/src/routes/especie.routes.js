const { Router } = require("express");
const router = Router();

const {
  getEspecies,
  createEspecie,
  getEspecieById,
  deleteEspecie,
  updateEspecie,
} = require("../controllers/especie.controller");

const auth = require("../middlewares/auth.middleware");
const verificarRol = require("../middlewares/role.middleware");

// Ruta base: /api/especies
router
  .route("/")
  .get(auth, verificarRol("admin"), getEspecies)
  .post(auth, verificarRol("admin"), createEspecie);

// Rutas con ID: /api/especies/:id
router
  .route("/:id")
  .get(auth, verificarRol("admin"), getEspecieById)
  .delete(auth, verificarRol("admin"), deleteEspecie)
  .put(auth, verificarRol("admin"), updateEspecie);

module.exports = router;
