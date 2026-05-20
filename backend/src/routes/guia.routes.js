const { Router } = require("express");
const router = Router();

const {
  getGuias,
  createGuia,
  getGuiaById,
  deleteGuia,
  updateGuia,
} = require("../controllers/guia.controller");

const auth = require("../middlewares/auth.middleware");
const verificarRol = require("../middlewares/role.middleware");

// Ruta base: /api/guias
router
  .route("/")
  .get(auth, verificarRol("admin"), getGuias)
  .post(auth, verificarRol("admin"), createGuia);

// Rutas con ID: /api/guias/:id
router
  .route("/:id")
  .get(auth, verificarRol("admin", "guia"), getGuiaById)
  .delete(auth, verificarRol("admin"), deleteGuia)
  .put(auth, verificarRol("admin"), updateGuia);

module.exports = router;
