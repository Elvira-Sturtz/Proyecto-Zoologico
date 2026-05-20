const { Router } = require("express");

const router = Router();

const {
  createZona,
  getZonas,
  getZonaById,
  deleteZona,
  updateZona,
} = require("../controllers/zona.controller");

const auth = require("../middlewares/auth.middleware");
const verificarRol = require("../middlewares/role.middleware");

// Estructura a utilizar respecto a las peticiones

router
  .route("/") //ruta home o inicial

  .get(auth, verificarRol("admin"), getZonas)
  .post(auth, verificarRol("admin"), createZona);

router
  .route("/:id")
  .get(auth, verificarRol("admin"), getZonaById)
  .delete(auth, verificarRol("admin"), deleteZona)
  .put(auth, verificarRol("admin"), updateZona);

module.exports = router;
