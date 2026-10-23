const Usuario = require("../../models/Usuario");
const Cuidador = require("../../models/Cuidador")
const Guia = require("../../models/Guia")


const { createAccessToken } = require("../../libs/jwt");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await Usuario.findOne({ email });

    if (!userFound) {
      return res.status(400).json({
        message: "Usuario no encontrado",
      });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Contraseña incorrecta",
      });
    }

    // const token = await createAccessToken({
    //   id: userFound._id,
    //   rol: userFound.rol,
    // });


 //  1. Buscamos dinámicamente si tiene perfil según su Rol
    let perfilId = null;
    
    if (userFound.rol === "cuidador") {
      const cuidador = await Cuidador.findOne({ usuario: userFound._id });
      if (cuidador) perfilId = cuidador._id;
    } else if (userFound.rol === "guia") {
      const guia = await Guia.findOne({ usuario: userFound._id });
      if (guia) perfilId = guia._id;
    }

    //  2. Creamos el token inyectando la propiedad correspondiente de forma dinámica
    const tokenPayload = {
      id: userFound._id,
      rol: userFound.rol,
    };

    if (userFound.rol === "cuidador") tokenPayload.cuidador = perfilId;
    if (userFound.rol === "guia") tokenPayload.guia = perfilId;

    const token = await createAccessToken(tokenPayload);



    res.cookie("token", token);

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   sameSite: "lax",
    // });

    //  3. Opcional: También lo puedes mandar en la respuesta HTTP por si el Frontend lo necesita
    res.status(200).json({
      message: "Inicio de Sesión correcto",
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      rol: userFound.rol,
      perfilId: perfilId // Mandará el ID de cuidador/guía o null si es admin
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = login;
