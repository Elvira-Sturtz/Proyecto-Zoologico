const { Router } = require("express");
const router = Router();

const {
  getCuidadores,
  createCuidador,
  getCuidadorById,
  deleteCuidador,
  updateCuidador,
} = require("../controllers/cuidador.controller");

const auth = require("../middlewares/auth.middleware");
const verificarRol = require("../middlewares/role.middleware");

// Ruta base: /api/cuidadores
router
  .route("/")
  .get(auth, verificarRol("admin"), getCuidadores)
  .post(auth, verificarRol("admin"), createCuidador); // Solo admin puede ver todos y crear

// Rutas con ID: /api/cuidadores/:id
router
  .route("/:id")
  .get(auth, verificarRol("admin", "cuidador"), getCuidadorById)
  .delete(auth, verificarRol("admin"), deleteCuidador)
  .put(auth, verificarRol("admin"), updateCuidador); // Solo admin actualiza y elimina

module.exports = router;
