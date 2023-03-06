const functions = require("firebase-functions");

const express = require("express");

const app = express();
const admin = require("firebase-admin");
const cors = require("cors");

const serviceAccount = require("../permiso.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://proyectoreservacion-default-rtdb.firebaseio.com"
});

app.use(cors({ origin: true }));

app.get("/hello-world", (req, res) => {
  return res.status(200).json({ message: "Hola!" });
});

// Routes
app.use(require("./routes/reservacion.routes"));

exports.app = functions.https.onRequest(app);
