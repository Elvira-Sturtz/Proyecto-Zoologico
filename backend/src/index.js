require("dotenv").config();

const app = require("./app");

const connectDB = require("./database");

//esta logica es para ejecutar el servidor
async function main() {
  await connectDB();

  await app.listen(app.get("port"));
  console.log("el servidor se esta ejecutando en el puerto: ", app.get("port"));
}

main();
