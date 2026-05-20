// Middleware para validar roles
const verificarRol = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "No autenticado" });
    }

    if (!roles.includes(req.user.rol)) {
      return res
        .status(403)
        .json({ message: "No tiene permiso para acceder a este recurso" }); //No autorizado
    }

    next();
  };
};

module.exports = verificarRol;
