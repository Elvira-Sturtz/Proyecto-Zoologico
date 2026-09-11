const Usuario = require("../../models/Usuario");

const profile = async (req, res) => {
  try {
    const userFound = await Usuario.findById(req.user.id);

    if (!userFound) {
      return res.status(400).json({
        message: "Usuario no encontrado",
      });
    }

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      rol: userFound.rol,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = profile;