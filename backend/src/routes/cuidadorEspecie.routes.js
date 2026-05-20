const { Router } = require("express");
const router = Router();

const {
  getCuidadoresEspecies,
  createCuidadorEspecie,
  getCuidadorEspecieById,
  deleteCuidadorEspecie,
  updateCuidadorEspecie,
  getMisEspecies,
} = require("../controllers/cuidadorEspecie.controller");

const auth = require("../middlewares/auth.middleware");
const verificarRol = require("../middlewares/role.middleware");

// Ruta base: /api/cuidador-especies  todas las relaciones
router
  .route("/")
  .get(auth, verificarRol("admin"), getCuidadoresEspecies)
  .post(auth, verificarRol("admin"), createCuidadorEspecie);

// Obtener especies de un cuidador especifico - Mis especies
router.get("/mis-especies", auth, verificarRol("cuidador"), getMisEspecies);

// Rutas con ID: /api/cuidador-especies/:id
router
  .route("/:id")
  .get(auth, verificarRol("admin", "cuidador"), getCuidadorEspecieById)
  .delete(auth, verificarRol("admin"), deleteCuidadorEspecie)
  .put(auth, verificarRol("admin"), updateCuidadorEspecie);

module.exports = router;
