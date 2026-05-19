const Usuario = require("../models/Usuario");

const { creaateAccessToken, createAccessToken } = require("../libs/jwt");

const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // hashing the password
    const passwordHash = await bcrypt.hash(password, 10);

    const newUsuario = new Usuario({
      username,
      email,
      password: passwordHash,
    });

    // saving the user in the database
    const userSaved = await newUsuario.save();

    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);
    res.status(201).json({
      message: "Usuario creado correctamente",
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
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
    res.status(201).json({
      message: "Usuario creado correctamente",
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
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

module.exports = { register, login, logout };
