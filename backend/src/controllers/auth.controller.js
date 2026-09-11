const Usuario = require("../models/Usuario");

const { createAccessToken } = require("../libs/jwt");

const bcrypt = require("bcryptjs");

// REGISTER
const register = async (req, res) => {
  try {
    const { email, password, username, rol } = req.body;

    // Verificar si ya existe email
    const userFound = await Usuario.findOne({ email });

    if (userFound) {
      return res.status(400).json({
        message: "El email ya existe",
      });
    }

    // Encriptar contraseña 
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUsuario = new Usuario({
      username,
      email,
      password: passwordHash,
      rol,
    });

    // Guardar usuario
    const userSaved = await newUsuario.save();

    // Crear token
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

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await Usuario.findOne({ email });

    if (!userFound) {
      return res.status(400).json({
        message: "Usuario no encontrado",
      });
    }

    // comparar para saber si coincide la contraseña
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Contraseña incorrecta",
      });
    }

    // crear token
    const token = await createAccessToken({
      id: userFound._id,
      rol: userFound.rol,
      
    });

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

// LOGOUT
const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });

  return res.sendStatus(200);
};

// Profile
const profile = async (req, res) => {
  const userFound = await Usuario.findById(req.user.id);

  if (!userFound) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }

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
