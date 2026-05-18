const mongoose = require("mongoose");

// cadena de conexion

const connectDB = async () => {
  try {
    const uri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/datazoologico";

    await mongoose.connect(uri);

    console.log(" DB conectada", uri);
  } catch (error) {
    console.error(" Error al conectar MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
