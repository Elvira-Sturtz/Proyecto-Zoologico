const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
var logger = require("morgan");

const authRoutes = require("./routes/auth.routes");

const app = express();

// configuración
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);

// rutas

app.get("/", (req, res) => {
  res.send("Bienvenido a mi api rest full");
});

// rutas zoo
app.use("/api/zonas", require("./routes/zona.routes"));
app.use("/api/habitats", require("./routes/habitat.routes"));
app.use("/api/especies", require("./routes/especie.routes"));
app.use("/api/itinerarios", require("./routes/itinerario.routes"));
app.use("/api/guias", require("./routes/guia.routes"));
app.use("/api/cuidadores", require("./routes/cuidador.routes"));
app.use("/api/guia-itinerarios", require("./routes/guiaItinerario.routes"));
app.use("/api/cuidador-especies", require("./routes/cuidadorEspecie.routes"));

module.exports = app;
