const Usuario = require("../models/Usuario");

const { createAccessToken } = require("../libs/jwt");

const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { email, password, username, rol } = req.body;

    // hashing the password
    const passwordHash = await bcrypt.hash(password, 10);

    const newUsuario = new Usuario({
      username,
      email,
      password: passwordHash,
      rol,
    });

    // saving the user in the database
    const userSaved = await newUsuario.save();

    const token = await createAccessToken({
      id: userSaved._id,
      rol: userSaved.rol,
    });

    res.cookie("token", token);

    res.status(201).json({
      message: "Usuario creado correctamente",
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      rol: userSaved.rol,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await Usuario.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        message: "Usuario no encontrado",
      });

    // coincide la contraseña
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Contraseña incorrecta",
      });
    }

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.status(200).json({
      message: "Inicio de Sesión correcto",
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      rol: userFound.rol,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

const profile = async (req, res) => {
  const userFound = await Usuario.findById(req.user.id);

  if (!userFound)
    return res.status(400).json({ message: "Usuario no encontrado" });

  return res.json({
    id: userFound.id,
    username: userFound.username,
    email: userFound.email,
    rol: userFound.rol,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

module.exports = { register, login, logout, profile };
