const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res
        .status(401)
        .json({ message: "No hay token, authorization denegada" });

    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Token no valido" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = auth;
