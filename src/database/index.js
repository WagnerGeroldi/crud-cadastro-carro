require('dotenv').config();
const dns = require("dns");
const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

async function connect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log("Conectado ao banco de dados MONGODB");
  } catch (error) {
    console.error("Erro de conexão:", error);
    throw error;
  }
}

module.exports = {
  connect,
};
