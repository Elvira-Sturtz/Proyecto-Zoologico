const { Router } = require("express");
const router = Router();

const {
  getCuidadoresEspecies,
  createCuidadorEspecie,
  getCuidadorEspecieById,
  deleteCuidadorEspecie,
  updateCuidadorEspecie,
  getEspeciesByCuidador,
} = require("../controllers/cuidadorEspecie.controller");

// Ruta base: /api/cuidador-especies
router.route("/").get(getCuidadoresEspecies).post(createCuidadorEspecie);

// Obtener especies de un cuidador
router.get("/cuidador/:id", getEspeciesByCuidador);

// Rutas con ID: /api/cuidador-especies/:id
router
  .route("/:id")
  .get(getCuidadorEspecieById)
  .delete(deleteCuidadorEspecie)
  .put(updateCuidadorEspecie);

module.exports = router;
